import {Command, flags} from '@oclif/command'

import Configuration from '../../lib/configuration'

export default class ConfigurationRead extends Command {
  static description = 'Echos current config'

  static flags = {
    help: flags.help({char: 'h'}),
    profile: flags.string({char: 'p', description: 'Profile name'})
  }

  async run() {
    const {flags} = this.parse(ConfigurationRead)

    const configuration = new Configuration()

    if (!configuration.isValid) {
      this.error('configuration is empty', {exit: 1})
    }

    if (flags.profile) {
      this.log(JSON.stringify(configuration.getProfile(flags.profile)))
    } else {
      this.log(JSON.stringify(configuration.config))
    }
  }
}
