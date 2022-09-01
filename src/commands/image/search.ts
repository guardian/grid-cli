import { Flags } from '@oclif/core'

import ApiCommand from '../../base-commands/api'

export default class ImageSearch extends ApiCommand {
  static description = 'Search for an Image from the API'

  static flags = {
    ...ApiCommand.flags,
    help: Flags.help({ char: 'h' }),

  }

  static args = [
    { name: 'q', description: 'Search query' }
  ]

  async run() {
    const { args: { q }, flags: { field, thumbnail } } = await this.parse(ImageSearch)
    if (q === undefined) {
      this.error('No search parameter given')
      return 1
    }
    this.log(`Searching for ${q}`)
    const results = await this.search(q)

    await this.printImages(results.data, field, thumbnail)

  }
}
