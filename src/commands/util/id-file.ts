import {Command, flags} from '@oclif/command'
import * as crypto from 'crypto'
import * as fs from 'fs'

export default class UtilIdFile extends Command {
  static description = 'Print the ID a file would get if uploaded to Grid'

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {name: 'file', description: 'Path to file to upload', required: true}
  ]

  async run() {
    const {args} = this.parse(UtilIdFile)

    if (!fs.existsSync(args.file)) {
      this.error(`File ${args.file} does not exist`, {exit: 1})
    }

    const hash = crypto.createHash('sha1')
    const content = fs.readFileSync(args.file)
    hash.update(content)
    this.log(hash.digest('hex'))
  }
}
