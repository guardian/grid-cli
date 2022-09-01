import { Flags } from '@oclif/core'
import { URL } from 'url'

import HttpCommand from '../../base-commands/http'

export default class ImageDownload extends HttpCommand {
  static description = 'describe the command here'

  static flags = {
    ...HttpCommand.flags,
    help: Flags.help({ char: 'h' }),
    directory: Flags.string({ char: 'd', description: 'directory to download to', default: '/tmp' }),
  }

  static args = [
    { name: 'id', description: 'ID of image', required: true }
  ]

  async run() {
    const { args, flags } = await this.parse(ImageDownload)
    const profile = this.profile!
    const http = this.http!

    const url = new URL(`${profile.mediaApiHost}images/${args.id}`)
    const image = await http.get(url).then(_ => _.json())
    // TODO stricter types
    const secureUrl = new URL(image.data.source.secureUrl)
    const download = await http.download(secureUrl, `${flags.directory}/${args.id}`)
    this.log(download)
  }
}
