import {flags} from '@oclif/command'

import ProfileCommand from '../../base-commands/profile'
import Configuration from '../../lib/configuration'

export default class ConfigurationRead extends ProfileCommand {
  static description = 'Echos current config'

  static flags = {
    ...ProfileCommand.flags,
    help: flags.help({char: 'h'}),
    all: flags.boolean({char: 'a', description: 'show all profiles'})
  }

  async run() {
    const {flags} = this.parse(ConfigurationRead)

    const configuration = new Configuration()

    if (!configuration.isValid) {
      this.error('configuration is empty', {exit: 1})
    }

    if (flags.all) {
      this.log(JSON.stringify(configuration.config))
    } else {
      this.log(JSON.stringify(configuration.getProfile(flags.profile)))
    }
  }
}
