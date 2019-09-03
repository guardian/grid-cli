import {flags} from '@oclif/command'
import {URL} from 'url'

import HttpCommand from '../../base-commands/http'

export default class ImageGet extends HttpCommand {
  static description = 'Get an Image from the API'

  static flags = {
    ...HttpCommand.flags,
    help: flags.help({char: 'h'})
  }

  static args = [
    {name: 'id', description: 'ID of image', required: true}
  ]

  async run() {
    const {args} = this.parse(ImageGet)

    const profile = this.profile!
    const http = this.http!

    const url = new URL(`${profile.mediaApiHost}images/${args.id}`)
    const image = await http.get(url).then(_ => _.json())
    this.log(JSON.stringify(image))
  }
}
