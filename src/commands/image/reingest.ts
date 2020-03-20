import {flags} from '@oclif/command'
import * as colors from 'colors/safe'
import * as diff from 'diff'

import ApiCommand from '../../base-commands/api'
import ServiceDiscovery from '../../lib/service-discovery'

export default class ImageReingest extends ApiCommand {
  static description = 'Reingest an image already present in the images bucket'

  static flags = {
    ...ApiCommand.flags,
    help: flags.help({char: 'h'}),
    dryRun: flags.boolean({
      name: 'dry-run',
      description: 'Display the result of the reingestion only',
      char: 'd'
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

    const serviceDiscovery = await new ServiceDiscovery(http, profile.mediaApiHost).discover()
    const adminTools = serviceDiscovery.getLink('admin-tools')

    if (!adminTools) {
      this.error(`Could not find the admin-tools service. Is it listed at ${profile.mediaApiHost}?`, {exit: 1})
    }

    const image = await this.fetchImage(imageId)

    if (image && !image.errorMessage) {
      this.error(`Cannot reingest - there is already an image with id ${imageId} in the Grid.`)
    }

    const imageToReingest = await this.fetchProjection(imageId, adminTools.href, !dryRun)

    if (dryRun) {
      this.printProjection(imageToReingest)
    } else {
      this.log(`Reingestion for image with id ${imageId} sent to queue`)
    }
  }

  private async printProjection(projection: object) {
    this.log(JSON.stringify(projection, null, 2))
  }

  private async fetchProjection(id: string, adminToolsEndpoint: URL, reingest = true) {
    let endpoint = `https://42na3il8vh.execute-api.eu-west-1.amazonaws.com/test/images/projection/${id}`
    if (reingest) {
      endpoint += '?reingest=true'
    }
    const url = new URL(endpoint)
    return this.http!.get(url).then(res => {
      if (res.status !== 200) {
        this.error(`Could not fetch projection – admin-tools returned ${res.status}: ${res.statusText}`, {exit: 1})
      }
      return res.json()
    })
  }
}
