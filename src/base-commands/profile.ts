import { Command, Flags } from '@oclif/core'

export default abstract class ProfileCommand extends Command {
  static flags = {
    profile: Flags.string({ char: 'p', description: 'Profile name', default: 'default' })
  }
}
