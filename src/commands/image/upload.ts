import {flags} from '@oclif/command'
import {existsSync, readFileSync} from 'fs'

import ReadProfileCommand from '../../base-commands/read-profile'
import Http from '../../lib/http'
import ServiceDiscovery from '../../lib/service-discovery'
import Try from '../../util/try'

export default class ImageUpload extends ReadProfileCommand {
  static description = 'Upload an image to Grid. Can be a local file or a publicly accessible URL'

  static flags = {
    ...ReadProfileCommand.flags,
    help: flags.help({char: 'h'}),
  }

  static args = [
    {name: 'image', description: 'Image to upload. If a URL, it must be publicly accessible', required: true}
  ]

  async run() {
    const {args: {image}} = this.parse(ImageUpload)

    const maybeUrl = new Try(() => new URL(image))

    if (!maybeUrl.isSuccess && !existsSync(image)) {
      this.error(`File ${image} does not exist`, {exit: 1})
    }

    const profile = this.profile!

    const http = new Http(profile.apiKey)
    const serviceDiscovery = await new ServiceDiscovery(http, profile.mediaApiHost).discover()
    const loader = serviceDiscovery.getLink('loader')

    if (!loader) {
      this.error('loader link not found', {exit: 1})
    }

    // Grid has a different endpoint for uploading an image as binary and for uploading the image via a url
    if (maybeUrl.isSuccess) {
      const url = new URL(`${loader!.href.toString()}/imports?uri=${encodeURIComponent(maybeUrl.get().toString())}`)
      const uploadedImage = await http.post(url)
      this.log(JSON.stringify(uploadedImage))
    } else {
      const url = new URL(loader!.href.toString() + '/images')
      const uploadedImage = await http.post(url, readFileSync(image))
      this.log(JSON.stringify(uploadedImage))
    }
  }
}
