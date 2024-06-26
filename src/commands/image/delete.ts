import { Flags } from '@oclif/core'
import ApiCommand from '../../base-commands/api'

export default class ImageDelete extends ApiCommand {
  static description = 'Delete (or un-soft-delete) an image from Grid'

  static flags = {
    ...ApiCommand.flags,
    help: Flags.help({ char: 'h' }),
    'hard-delete': Flags.boolean({
      char: 'x',
      description: 'permanently delete image',
    }),
    'un-soft-delete': Flags.boolean({
      char: 'u',
      description: 'un-soft-delete image',
    }),
  }

  static args = [
    { name: 'id', description: 'ID of image', required: true },
  ]

  async run() {
    const { args, flags } = await this.parse(ImageDelete)

    if (flags['un-soft-delete']) {
      try {
        await this.unSoftDeleteImage(args.id)
        this.log('Image un-soft-deleted')
      } catch (error) {
        this.error(error as Error)
      }
    }

    const hardDelete = flags['hard-delete']
    await this.confirmHardDelete(hardDelete)

    try {
      await this.deleteImage(args.id, hardDelete)
      this.log('Image deleted')
    } catch (error) {
      this.error(error as Error)
    }
  }
}
