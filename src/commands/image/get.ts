import {flags} from '@oclif/command'

import ReadProfileCommand from '../../base-commands/read-profile'
import Http from '../../lib/http'

export default class ImageGet extends ReadProfileCommand {
  static description = 'Get an Image from the API'

  static flags = {
    ...ReadProfileCommand.flags,
    help: flags.help({char: 'h'})
  }

  static args = [
    {name: 'id', description: 'ID of image', required: true}
  ]

  async run() {
    const {args} = this.parse(ImageGet)

    const profile = this.profile!

    const http = new Http(profile.apiKey)
    const url = new URL(`${profile.mediaApiHost}images/${args.id}`)
    const image = await http.get(url)
    this.log(JSON.stringify(image))
  }
}
