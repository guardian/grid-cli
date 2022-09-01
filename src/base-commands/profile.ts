import { Command, Flags } from '@oclif/core'

export default abstract class ProfileCommand extends Command {
  static globalFlags = {
    profile: Flags.string({ char: 'p', description: 'Profile name', default: 'default' })
  }
}
