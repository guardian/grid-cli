import cli from 'cli-ux'

import ConfigurationAdd from '../commands/configuration/add'
import Configuration from '../lib/configuration'
import {ProfileConfig} from '../types/config'

import ProfileCommand from './profile'

export default abstract class ReadProfileCommand extends ProfileCommand {
  static flags = {
    ...ProfileCommand.flags,
  }

  // `init` gets called before a command's `run`, so `profile` will be assigned on time
  protected profile: ProfileConfig | undefined

  async init() {
    // @ts-ignore
    const {flags} = this.parse(this.constructor)

    const configuration = new Configuration()
    const profile = configuration.getProfile(flags.profile)

    if (profile) {
      this.profile = profile
    } else {
      const addConfigNow = await cli.confirm(`No configuration found for profile ${flags.profile}. Add one now?`)

      if (addConfigNow) {
        this.profile = await ConfigurationAdd.run(['-p', flags.profile, '-x'])
      } else {
        this.log(`To add a configuration, run ${ConfigurationAdd.id}`)
        this.exit(1)
      }
    }
  }
}
