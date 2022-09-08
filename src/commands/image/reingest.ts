import { Flags } from '@oclif/core'
import * as colors from 'colors/safe'
import * as diff from 'diff'

import ApiCommand from '../../base-commands/api'
import ServiceDiscovery from '../../lib/service-discovery'

export default class ImageReingest extends ApiCommand {
  static description = 'Reingest an image already present in the images bucket'

  static flags = {
    ...ApiCommand.flags,
    help: Flags.help({ char: 'h' }),
    dryRun: Flags.boolean({
      name: 'dry-run',
      description: 'Display the result of the reingestion only',
      char: 'd',
    }),
    compare: Flags.boolean({
      name: 'compare',
      description: 'Do a dry run, and display the difference between the result and the data returned for this image from media-api',
      char: 'c',
    }),
    force: Flags.boolean({
      name: 'force',
      description: 'Force reingestion if the image is already present in the Grid',
      char: 'f',
    }),
  }

  static args = [{
    name: 'id',
    description: 'ID of image',
    required: true,
  }]

  async run() {
    const { args, flags } = await this.parse(ImageReingest)

    const imageId: string = args.id

    const http = this.http!
    const profile = this.profile!
    const dryRun = flags.dryRun
    const compare = flags.compare
    const force = Boolean(flags.force)

    const serviceDiscovery = await new ServiceDiscovery(http, profile.mediaApiHost).discover()
    const adminTools = serviceDiscovery.getLink('admin-tools')

    if (!adminTools) {
      this.error(`Could not find the admin-tools service. Is it listed at ${profile.mediaApiHost}?`, { exit: 1 })
    }

    const imageResponse = await this.fetchImage(imageId)

    if (this.imageExists(imageResponse) && !force) {
      this.error(`Cannot reingest - there is already an image with id ${imageId} in the Grid. Add --force to overwrite it.`, { exit: 1 })
    }

    const imageToReingest = await this.fetchProjection(imageId, adminTools.href, !dryRun)

    if (dryRun || compare) {
      await this.printProjection(imageToReingest, Boolean(compare))
    } else {
      this.log(`Reingestion for image with id ${imageId} sent to queue.\n`)
      try {
        await this.pollForImage(imageId)
        this.log('\nImage successfully reingested.')
      } catch (error) {
        this.error((error as Error)?.message)
      }
    }
  }

  private async printProjection(
    projection: any,
    diffAgainstES: boolean,
  ) {
    if (diffAgainstES) {
      const image = await this.fetchImage(projection.id, '_elasticsearch')
      const imageDiff = diff.diffJson(image.data || {}, projection)
      /* eslint-disable indent */
      // eslint tries to align the `.map`s with the `imageDiff`
      imageDiff
        .map(this.changeToConsoleString)
        .map(_ => this.log(_))
      /* eslint-enable indent */
    } else {
      this.log(JSON.stringify(projection, null, 2))
    }
  }

  private async fetchProjection(id: string, adminToolsEndpoint: URL, reingest = true) {
    const url = new URL(`${adminToolsEndpoint}/images/projection/${id}`)
    if (reingest) {
      url.searchParams.append('reingest', 'true')
    }

    return this.http!.get(url).then(res => {
      if (res.status !== 200) {
        this.error(`Could not fetch projection – admin-tools returned ${res.status}: ${res.statusText}`, { exit: 1 })
      }

      return res.json()
    })
  }

  private async pollForImage(id: string, maxIterations = 5, delayBetweenRequestsInMs = 2000) {
    let currentIteration = 0
    process.stdout.write('Polling to check that image has been reingested successfully')
    while (currentIteration < maxIterations) {
      const imageResponse = await this.fetchImage(id)
      process.stdout.write('.')
      if (this.imageExists(imageResponse)) {
        return
      }

      await this.wait(delayBetweenRequestsInMs)
      currentIteration++
    }

    this.log('\n')
    throw new Error(`Timed out trying to find image – tried ${maxIterations} times over ${maxIterations * delayBetweenRequestsInMs / 1000} seconds`)
  }

  private readonly wait = (delayInMs: number) =>
    new Promise<void>(resolve => {
      setTimeout(() => resolve(), delayInMs)
    })

  private imageExists(imageResponse: any) {
    return imageResponse && !imageResponse.errorMessage
  }

  private changeToConsoleString(change: diff.Change) {
    const color = change.added ? 'green' : (change.removed ? 'red' : 'grey')
    return colors[color](change.value)
  }
}
