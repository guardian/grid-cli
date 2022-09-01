import { Flags } from '@oclif/core'

import ApiCommand from '../../base-commands/api'

export default class ImageSearch extends ApiCommand {
  static description = 'Search for an Image from the API'

  static flags = {
    ...ApiCommand.flags,
    help: Flags.help({ char: 'h' }),
    maxResults: Flags.integer({ char: 'n', default: 10, min: 1 }),
    pageSize: Flags.integer({ char: 's', default: 10, min: 1, max: 200 }),
  }

  static args = [
    { name: 'q', description: 'Search query' },
  ]

  async run() {
    const { args: { q }, flags: { field, thumbnail, maxResults, pageSize } } = await this.parse(ImageSearch)
    if (q === undefined) {
      this.error('No search parameter given')
      return
    }

    this.log(`Searching for ${q}`)
    let results: any[] = []
    const maxPages = Math.ceil(maxResults / pageSize)

    for (let i = 0; i < maxPages; i++) {
      this.log(`performing search ${i + 1} of (at most) ${maxPages}`)
      const thisPageSize = i === maxPages - 1 && maxResults % pageSize !== 0 ? maxResults % pageSize : pageSize
      const page = await this.search(q, { page: i, size: thisPageSize })
      results = [...results, ...page.data]
      if (page.data.length < pageSize) {
        this.log(`page ${i} returned less than ${pageSize} results, so terminating search loop now!`)
        break
      }
    }

    await this.printImages(results, field, thumbnail)
  }
}
