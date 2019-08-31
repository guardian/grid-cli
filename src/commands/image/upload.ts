import {flags} from '@oclif/command'
import * as fs from 'fs'

import Configuration from '../../lib/configuration'
import Http from '../../lib/http'
import ServiceDiscovery from '../../lib/service-discovery'
import ProfileCommand from '../../profile-command'

export default class ImageUpload extends ProfileCommand {
  static description = 'Upload an image to Grid'

  static flags = {
    ...ProfileCommand.flags,
    help: flags.help({char: 'h'}),
  }

  static args = [
    {name: 'file', description: 'Path to file to upload', required: true}
  ]

  async run() {
    const {flags, args} = this.parse(ImageUpload)

    if (!fs.existsSync(args.file)) {
      this.error(`File ${args.file} does not exist`, {exit: 1})
    }

    const configuration = new Configuration()

    if (!configuration.isValid) {
      this.error('configuration is empty', {exit: 1})
    }

    const profile = configuration.getProfile(flags.profile)

    if (!profile) {
      this.error(`no configuration for profile ${flags.profile}`, {exit: 1})
    }

    const http = new Http(profile!.apiKey)
    const serviceDiscovery = await new ServiceDiscovery(http, profile!.mediaApiHost).discover()
    const loader = serviceDiscovery.getLink('loader')

    if (!loader) {
      this.error('loader link not found', {exit: 1})
    }

    const url = new URL(loader!.href.toString() + '/images')
    const uploadedImage = await http.post(url, fs.readFileSync(args.file))
    this.log(JSON.stringify(uploadedImage))
  }
}
