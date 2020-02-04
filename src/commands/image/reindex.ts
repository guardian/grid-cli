import {flags} from '@oclif/command'
import * as colors from 'colors/safe'
import * as diff from 'diff'

import ApiCommand from '../../base-commands/api'
import ServiceDiscovery from '../../lib/service-discovery'

export default class ImageReingest extends ApiCommand {
  static description = 'Reindex an image already present in the images bucket'

  static flags = {
    ...ApiCommand.flags,
    help: flags.help({char: 'h'}),
    dryRun: flags.boolean({
      name: 'dry-run',
      description: 'Display the result of the reingestion only',
      char: 'd'
    }),
    compare: flags.boolean({
      name: 'compare',
      description: 'Do a dry run, and display the difference between the result and the data returned for this image from media-api',
      char: 'c'
    })
  }

  static args = [{name: 'id', description: 'ID of image', required: true}]

  async run() {
    const {args, flags} = this.parse(ImageReingest)

    const imageId: string = args.id

    const http = this.http!
    const profile = this.profile!
    const dryRun = flags.dryRun
    const compare = flags.compare

    const serviceDiscovery = await new ServiceDiscovery(http, profile.mediaApiHost).discover()
    const adminTools = serviceDiscovery.getLink('admin-tools')

    if (!adminTools) {
      this.error(`Could not find the admin-tools service. Is it listed at ${profile.mediaApiHost}?`, {exit: 1})
    }

    const endpoint = `${adminTools!.href}/images/projection/${imageId}`
    const url = new URL(endpoint)
    const projection: object = await http.get(url).then(_ => _.json())

    if (dryRun || compare) {
      return this.printProjection(imageId, projection, !!compare)
    }

    return this.addProjectionToKinesis(projection)
  }

  private async printProjection(
    id: string,
    projection: object,
    diffAgainstES: boolean
  ) {
    if (diffAgainstES) {
      const image = await this.fetchImage(id, '_elasticsearch')
      const imageDiff = diff.diffJson(image.data || {}, projection)
      imageDiff
        .map(this.changeToConsoleString)
        .map(_ => console.log(_))
    } else {
      console.log(projection)
    }
  }

  private addProjectionToKinesis(projection: unknown) {
    console.log('Not yet implemented')
  }

  private changeToConsoleString(change: diff.Change) {
    const color = change.added ? 'green' : change.removed ? 'red' : 'grey'
    return colors[color](change.value)
  }
}
