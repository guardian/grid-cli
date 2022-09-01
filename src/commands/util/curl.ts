import { Flags } from '@oclif/core'
import { URL } from 'url'

import HttpCommand from '../../base-commands/http'
import Try from '../../util/try'

export default class UtilCurl extends HttpCommand {
  static description = 'Make an authenticated request to a Grid URL. Assumes response is JSON.'

  static flags = {
    ...HttpCommand.flags,
    help: Flags.help({ char: 'h' }),
    method: Flags.string({
      char: 'x',
      description: 'The HTTP verb to use',
      options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      default: 'GET'
    }),
    data: Flags.string({
      char: 'd',
      description: 'The body of the request'
    })
  }

  static args = [
    { name: 'url', description: 'The URL to request', required: true }
  ]

  async run() {
    const { args, flags } = await this.parse(UtilCurl)

    const maybeUrl = new Try(() => new URL(args.url))

    if (!maybeUrl.isSuccess) {
      this.error(`${args.url} is not a valid url`, { exit: 1 })
    }

    const http = this.http!

    const response = await http.request(flags.method, args.url, flags.data)
    this.log(JSON.stringify(response))
  }
}
