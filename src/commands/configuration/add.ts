import {flags} from '@oclif/command'

import ProfileCommand from '../../base-commands/profile'
import Configuration from '../../lib/configuration'
import Try from '../../util/try'

export default class ConfigurationAdd extends ProfileCommand {
  static description = 'Add a configuration profile'

  static flags = {
    ...ProfileCommand.flags,
    help: flags.help({char: 'h'}),
    mediaApiHost: flags.string({char: 'm', description: 'Hostname for media-api', required: true}),
    apiKey: flags.string({char: 'k', description: 'API key', required: true})
  }

  async run() {
    const {flags} = this.parse(ConfigurationAdd)

    const maybeMediaApi = new Try(() => new URL(flags.mediaApiHost))

    if (!maybeMediaApi.isSuccess) {
      this.error(`${flags.mediaApiHost} is not a valid hostname`, {exit: 1})
    }

    const configuration = new Configuration()

    const newProfile = {
      name: flags.profile,
      mediaApiHost: maybeMediaApi.get(),
      apiKey: flags.apiKey
    }

    configuration.addProfile(newProfile)
  }
}
