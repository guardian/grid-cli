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

  static args = [{
    name: 'id',
    description: 'ID of image',
    required: true,
  }]

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

    if (dryRun || compare) {
      const imageToReindex = await this.fetchProjection(imageId, adminTools.href)
      return this.printProjection(imageId, imageToReindex, !!compare)
    }

    return this.reindexImage(imageId, adminTools.href)
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
        .map(_ => this.log(_))
    } else {
      this.log(JSON.stringify(projection, null, 2))
    }
  }

  private async fetchProjection(id: string, adminToolsEndpoint: URL) {
    const endpoint = `${adminToolsEndpoint}/images/projection/${id}`
    const url = new URL(endpoint)
    return this.http!.get(url).then(res => {
      if (res.status !== 200) {
        this.error(`Could not fetch projection – admin-tools returned ${res.status}: ${res.statusText}`, {exit: 1})
      }
      return res.json()
    })
  }

  private async reindexImage(id: string, adminToolsEndpoint: URL) {
    const endpoint = `${adminToolsEndpoint}/images/reindex/${id}`
    const url = new URL(endpoint)
    return this.http!.post(url).then(res => {
      if (!(res.status >= 200 && res.status <= 299)) {
        this.error(`Could not reindex image – admin-tools returned ${res.status}: ${res.statusText}`, {exit: 1})
      }
    })
  }

  private changeToConsoleString(change: diff.Change) {
    const color = change.added ? 'green' : change.removed ? 'red' : 'grey'
    return colors[color](change.value)
  }
}
