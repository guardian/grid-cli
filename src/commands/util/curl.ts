import {flags} from '@oclif/command'

import Configuration from '../../lib/configuration'
import Http from '../../lib/http'
import ProfileCommand from '../../profile-command'
import Try from '../../util/try'

export default class UtilCurl extends ProfileCommand {
  static description = 'Make an authenticated request to a Grid URL. Assumes response is JSON.'

  static flags = {
    ...ProfileCommand.flags,
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

    const configuration = new Configuration()

    if (!configuration.isValid) {
      this.error('configuration is empty', {exit: 1})
    }

    const profile = configuration.getProfile(flags.profile)

    if (!profile) {
      this.error(`no configuration for profile ${flags.profile}`, {exit: 1})
    }

    const http = new Http(profile!.apiKey)
    const response = await http.request(flags.method, args.url, flags.data)
    this.log(JSON.stringify(response))
  }
}
