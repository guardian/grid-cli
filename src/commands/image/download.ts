import {flags} from '@oclif/command'

import Configuration from '../../lib/configuration'
import Http from '../../lib/http'
import ProfileCommand from '../../profile-command'

export default class ImageDownload extends ProfileCommand {
  static description = 'describe the command here'

  static flags = {
    ...ProfileCommand.flags,
    help: flags.help({char: 'h'}),
    directory: flags.string({char: 'd', description: 'directory to download to', default: '/tmp'}),
  }

  static args = [
    {name: 'id', description: 'ID of image', required: true}
  ]

  async run() {
    const {args, flags} = this.parse(ImageDownload)

    const configuration = new Configuration()

    if (!configuration.isValid) {
      this.error('configuration is empty', {exit: 1})
    }

    const profile = configuration.getProfile(flags.profile)

    if (!profile) {
      this.error(`no configuration for profile ${flags.profile}`, {exit: 1})
    }

    const http = new Http(profile!.apiKey)
    const url = new URL(`${profile!.mediaApiHost}images/${args.id}`)
    const image = await http.get(url)
    // TODO stricter types
    const secureUrl = new URL(image.data.source.secureUrl)
    const download = await http.download(secureUrl, `${flags.directory}/${args.id}`)
    this.log(download)
  }
}
