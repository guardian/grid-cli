import Command, {flags} from '@oclif/command'

export default abstract class extends Command {
  static flags = {
    profile: flags.string({char: 'p', description: 'Profile name', default: 'default'})
  }
}
