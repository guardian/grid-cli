import {flags} from '@oclif/command'

import ApiCommand from '../../base-commands/api'

export default class ImageGet extends ApiCommand {
  static description = 'Get an Image from the API'

  static flags = {
    ...ApiCommand.flags,
    help: flags.help({char: 'h'})
  }

  static args = [
    {name: 'id', description: 'ID of image'}
  ]

  async run() {
    const {args} = this.parse(ImageGet)

    const id = args.id

    const image = await this.fetchImage(id)
    this.log(JSON.stringify(image, null, 2))
  }
}
