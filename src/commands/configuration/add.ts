import {Command, flags} from '@oclif/command'

import Configuration from '../../lib/configuration'
import Try from '../../util/try'

export default class ConfigurationAdd extends Command {
  static description = 'Add a configuration profile'

  static flags = {
    help: flags.help({char: 'h'}),
    profile: flags.string({char: 'p', description: 'Profile name', default: 'default'}),
    mediaApiHost: flags.string({char: 'm', description: 'Hostname for media-api', required: true}),
    apiKey: flags.string({char: 'k', description: 'API key', required: true})
  }

  async run() {
    const {flags} = this.parse(ConfigurationAdd)

    if (!Try(() => new URL(flags.mediaApiHost!))) {
      this.error(`${flags.mediaApiHost} is not a valid hostname`, {exit: 1})
    }

    const configuration = new Configuration()

    const newProfile = {
      name: flags.profile,
      mediaApiHost: flags.mediaApiHost,
      apiKey: flags.apiKey
    }

    configuration.addProfile(newProfile)
  }
}
