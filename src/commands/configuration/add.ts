import { Flags } from '@oclif/core'
import { CliUx } from '@oclif/core'
import { URL } from 'url'

import ProfileCommand from '../../base-commands/profile'
import Configuration from '../../lib/configuration'
import Try from '../../util/try'

export default class ConfigurationAdd extends ProfileCommand {
  static description = 'Add a configuration profile'

  static flags = {
    ...ProfileCommand.flags,
    help: Flags.help({ char: 'h' }),
    mediaApiHost: Flags.string({ char: 'm', description: 'Hostname for media-api' }),
    apiKey: Flags.string({ char: 'k', description: 'API key' }),
    preventProfileChange: Flags.boolean({ char: 'x', hidden: true })
  }

  async run() {
    let { flags: { profile, mediaApiHost, apiKey, preventProfileChange } } = await this.parse(ConfigurationAdd)

    if (!mediaApiHost || !apiKey) {
      if (!preventProfileChange) {
        profile = await CliUx.ux.prompt('What profile shall we setup?', { default: profile })
      }
      mediaApiHost = await CliUx.ux.prompt(`[profile: ${profile}] What is the root for the Media API?`, { required: true })
      apiKey = await CliUx.ux.prompt(`[profile: ${profile}] What is your API key?`, { required: true })
    }

    const maybeMediaApi = new Try(() => new URL(mediaApiHost!))

    if (!maybeMediaApi.isSuccess) {
      this.error(`${mediaApiHost!} is not a valid hostname`, { exit: 1 })
    }

    const newProfile = {
      name: profile!,
      mediaApiHost: maybeMediaApi.get(),
      apiKey: apiKey!
    }

    const configuration = new Configuration()
    return configuration.addProfile(newProfile)
  }
}
