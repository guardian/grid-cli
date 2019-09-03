import {flags} from '@oclif/command'
import * as open from 'open'

import HttpCommand from '../../base-commands/http'

export default class ImageVisit extends HttpCommand {
  static description = 'View image in the browser'

  static flags = {
    ...HttpCommand.flags,
    help: flags.help({char: 'h'})
  }

  static args = [
    {name: 'id', description: 'ID of image', required: true}
  ]

  async run() {
    const {args} = this.parse(ImageVisit)

    const profile = this.profile!
    const http = this.http!

    const url = new URL(`${profile.mediaApiHost}images/${args.id}`)
    const response = await http.get(url)

    if (response.status === 200) {
      const image = await response.json()
      // TODO stricter types
      const kahunaUrl = image.links.find((_: { rel: string, href: URL }) => _.rel === 'ui:image').href
      await open(kahunaUrl)
    } else {
      this.error(`Image with ID ${args.id} not found`)
    }
  }
}
