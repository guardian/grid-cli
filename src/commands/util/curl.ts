import {flags} from '@oclif/command'

import ReadProfileCommand from '../../base-commands/read-profile'
import Try from '../../util/try'

export default class UtilCurl extends ReadProfileCommand {
  static description = 'Make an authenticated request to a Grid URL. Assumes response is JSON.'

  static flags = {
    ...ReadProfileCommand.flags,
    help: flags.help({char: 'h'}),
    method: flags.string({
      char: 'x',
      description: 'The HTTP verb to use',
      options: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      default: 'GET'
    }),
    data: flags.string({
      char: 'd',
      description: 'The body of the request'
    })
  }

  static args = [
    {name: 'url', description: 'The URL to request', required: true}
  ]

  async run() {
    const {args, flags} = this.parse(UtilCurl)

    const maybeUrl = new Try(() => new URL(args.url))

    if (!maybeUrl.isSuccess) {
      this.error(`${args.url} is not a valid url`, {exit: 1})
    }

    const http = this.http!

    const response = await http.request(flags.method, args.url, flags.data)
    this.log(JSON.stringify(response))
  }
}
