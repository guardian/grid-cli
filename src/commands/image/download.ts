import {flags} from '@oclif/command'

import ReadProfileCommand from '../../base-commands/read-profile'

export default class ImageDownload extends ReadProfileCommand {
  static description = 'describe the command here'

  static flags = {
    ...ReadProfileCommand.flags,
    help: flags.help({char: 'h'}),
    directory: flags.string({char: 'd', description: 'directory to download to', default: '/tmp'}),
  }

  static args = [
    {name: 'id', description: 'ID of image', required: true}
  ]

  async run() {
    const {args, flags} = this.parse(ImageDownload)
    const profile = this.profile!
    const http = this.http!

    const url = new URL(`${profile.mediaApiHost}images/${args.id}`)
    const image = await http.get(url)
    // TODO stricter types
    const secureUrl = new URL(image.data.source.secureUrl)
    const download = await http.download(secureUrl, `${flags.directory}/${args.id}`)
    this.log(download)
  }
}
