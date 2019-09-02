import {flags} from '@oclif/command'

import Configuration from '../../lib/configuration'
import Http from '../../lib/http'
import ServiceDiscovery from '../../lib/service-discovery'
import ProfileCommand from '../../profile-command'

export default class CollectionAddRoot extends ProfileCommand {
  static description = 'Add a root collection'

  static flags = {
    ...ProfileCommand.flags,
    help: flags.help({char: 'h'})
  }

  static args = [
    {name: 'name', description: 'Root collection to add', required: true}
  ]

  async run() {
    const {args, flags} = this.parse(CollectionAddRoot)

    const configuration = new Configuration()

    if (!configuration.isValid) {
      this.error('configuration is empty', {exit: 1})
    }

    const profile = configuration.getProfile(flags.profile)

    if (!profile) {
      this.error(`no configuration for profile ${flags.profile}`, {exit: 1})
    }

    const http = new Http(profile!.apiKey)
    const serviceDiscovery = await new ServiceDiscovery(http, profile!.mediaApiHost).discover()
    const collectionsRoot = serviceDiscovery.getLink('collections')

    if (!collectionsRoot) {
      this.error('collections link not found', {exit: 1})
    }

    const url = new URL(`${collectionsRoot!.href.toString()}/collections`)
    const newCollection = await http.post(url, JSON.stringify({data: args.name}))
    this.log(JSON.stringify(newCollection))
  }
}
