import cli from 'cli-ux'

import ConfigurationAdd from '../commands/configuration/add'
import Configuration from '../lib/configuration'
import Http from '../lib/http'
import {ProfileConfig} from '../types/config'

import ProfileCommand from './profile'

export default abstract class HttpCommand extends ProfileCommand {
  static flags = {
    ...ProfileCommand.flags,
  }

  // `init` gets called before a command's `run`, so `profile` and `http` will be assigned on time
  protected profile: ProfileConfig | undefined
  protected http: Http | undefined

  async init() {
    // @ts-ignore
    const {flags} = this.parse(this.constructor) as any

    const configuration = new Configuration()
    const profile = configuration.getProfile(flags.profile)

    if (profile) {
      this.profile = profile
      this.http = new Http(profile.apiKey)
    } else {
      const addConfigNow = await cli.confirm(`No configuration found for profile ${flags.profile}. Add one now?`)

      if (addConfigNow) {
        const newProfile = await ConfigurationAdd.run(['-p', flags.profile, '-x'])
        this.profile = newProfile
        this.http = new Http(newProfile.apiKey)
      } else {
        this.log(`To add a configuration, run ${ConfigurationAdd.id}`)
        this.exit(1)
      }
    }
  }

  async catch(err: any) {
    if (err.code === 'UNABLE_TO_VERIFY_LEAF_SIGNATURE') {
      this.error('Failed to make http request', {exit: false})
      this.error(err.message, {exit: false})
      this.error('If you are using a self-signed certificate perhaps through using guardian/dev-nginx, set the `NODE_EXTRA_CA_CERTS` environment variable first', {exit: false})
    }
    throw err
  }
}
