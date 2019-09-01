import {flags} from '@oclif/command'

import Configuration from '../../lib/configuration'
import Http from '../../lib/http'
import ProfileCommand from '../../profile-command'

export default class ImageGet extends ProfileCommand {
  static description = 'Get an Image from the API'

  static flags = {
    ...ProfileCommand.flags,
    help: flags.help({char: 'h'})
  }

  static args = [
    {name: 'id', description: 'ID of image', required: true}
  ]

  async run() {
    const {args, flags} = this.parse(ImageGet)

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
    this.log(JSON.stringify(image))
  }
}
