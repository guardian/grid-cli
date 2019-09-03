import {flags} from '@oclif/command'

import HttpCommand from '../../base-commands/http'

export default class ImageDelete extends HttpCommand {
  static description = 'Delete an image from Grid'

  static flags = {
    ...HttpCommand.flags,
    help: flags.help({char: 'h'})
  }

  static args = [
    {name: 'id', description: 'ID of image', required: true}
  ]

  async run() {
    const {args} = this.parse(ImageDelete)

    const profile = this.profile!
    const http = this.http!

    const url = new URL(`${profile.mediaApiHost}images/${args.id}`)
    const response = await http.delete(url)
    
    if (response.status === 202) {
      this.log('Image deleted')
    } else {
      this.error(JSON.stringify(response.json()))
    }
  }
}
