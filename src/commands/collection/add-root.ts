import {flags} from '@oclif/command'

import ReadProfileCommand from '../../base-commands/read-profile'
import Http from '../../lib/http'
import ServiceDiscovery from '../../lib/service-discovery'

export default class CollectionAddRoot extends ReadProfileCommand {
  static description = 'Add a root collection'

  static flags = {
    ...ReadProfileCommand.flags,
    help: flags.help({char: 'h'})
  }

  static args = [
    {name: 'name', description: 'Root collection to add', required: true}
  ]

  async run() {
    const {args} = this.parse(CollectionAddRoot)

    const profile = this.profile!

    const http = new Http(profile.apiKey)
    const serviceDiscovery = await new ServiceDiscovery(http, profile.mediaApiHost).discover()
    const collectionsRoot = serviceDiscovery.getLink('collections')

    if (!collectionsRoot) {
      this.error('collections link not found', {exit: 1})
    }

    const url = new URL(`${collectionsRoot!.href.toString()}/collections`)
    const newCollection = await http.post(url, JSON.stringify({data: args.name}))
    this.log(JSON.stringify(newCollection))
  }
}
