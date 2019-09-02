import {flags} from '@oclif/command'
import cli from 'cli-ux'

import ProfileCommand from '../../base-commands/profile'
import Configuration from '../../lib/configuration'
import Try from '../../util/try'

export default class ConfigurationAdd extends ProfileCommand {
  static description = 'Add a configuration profile'

  static flags = {
    ...ProfileCommand.flags,
    help: flags.help({char: 'h'}),
    mediaApiHost: flags.string({char: 'm', description: 'Hostname for media-api'}),
    apiKey: flags.string({char: 'k', description: 'API key'}),
    preventProfileChange: flags.boolean({char: 'x', hidden: true})
  }

  async run() {
    let {flags: {profile, mediaApiHost, apiKey, preventProfileChange}} = this.parse(ConfigurationAdd)

    if (!mediaApiHost || !apiKey) {
      if (!preventProfileChange) {
        profile = await cli.prompt('What profile shall we setup?', {default: profile})
      }
      mediaApiHost = await cli.prompt(`[profile: ${profile}] What is the root for the Media API?`, {required: true})
      apiKey = await cli.prompt(`[profile: ${profile}] What is your API key?`, {required: true})
    }

    const maybeMediaApi = new Try(() => new URL(mediaApiHost!))

    if (!maybeMediaApi.isSuccess) {
      this.error(`${mediaApiHost!} is not a valid hostname`, {exit: 1})
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
