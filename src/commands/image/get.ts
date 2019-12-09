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
    {name: 'id', description: 'ID of image'}
  ]

  async run() {
    const {args} = this.parse(ImageGet)

    const id = args.id

    const profile = this.profile!
    const http = this.http!

    const mainEndpoint = `${profile.mediaApiHost}images`

    const endpoint = id ? `${mainEndpoint}/${id}` : mainEndpoint

    const url = new URL(endpoint)
    const image = await http.get(url).then(_ => _.json())
    this.log(JSON.stringify(image))
  }
}
