import { Flags } from '@oclif/core'
import { createReadStream, createWriteStream, WriteStream } from 'fs'
import lines from 'lines-async-iterator'

import ApiCommand from '../../base-commands/api'

export default class BulkDelete extends ApiCommand {
  static description = 'Deletes images from a text file containing image ids'

  static flags = {
    ...ApiCommand.flags,
    help: Flags.help({ char: 'h' }),
    'hard-delete': Flags.boolean({
      char: 'x',
      description: 'permanently erase images'
    }),
  }

  static args = [
    { name: 'input', description: 'file to read, containing one grid id per line', required: true },
    {
      name: 'output',
      description: 'file to output results to',
      required: true,
    },
    {
      name: 'failures',
      description: 'file to write bad ids to',
      required: true,
    },
  ]

  async delete(id: string, hardDelete: boolean, output: WriteStream, failures: WriteStream) {
    try {
      await this.deleteImage(id, hardDelete)
    } catch (error) {
      this.log(`Failed to delete ${id} ${(error as Error).message}`)
      failures.write(`${id}\n`)
      output.write(`${id}\t${(error as Error).message}\n`)
      return false
    }

    output.write(`${id}\tSUCCESS\n`)

    return true
  }

  async countLines(fname: string): Promise<number> {
    const lf = '\n'.charCodeAt(0)
    const stream = createReadStream(fname)
    let lines = 0
    stream.on('data', chunk => {
      const data = typeof chunk === 'string' ? Buffer.from(chunk) : chunk
      for (const c of data) {
        if (c === lf) lines++
      }
    })
    return new Promise((resolve, reject) => {
      stream.on('end', () => resolve(lines))
      stream.on('error', (e) => reject(e))
    });
  }

  async run() {
    const http = this.http
    if (!http) {
      this.log('No http, no anything.')
      return false
    }

    const { flags, args } = await this.parse(BulkDelete)

    const hardDelete = flags['hard-delete']

    const lineCount = await this.countLines(args.input)

    await this.confirmHardDelete(hardDelete)

    const failures = createWriteStream(args.failures)

    const output = createWriteStream(args.output)

    let done = 0;
    for await (const id of lines(args.input)) {
      this.delete(id, hardDelete, output, failures)
      this.log(`Successfully deleted ${id} - ${++done} / ${lineCount}`)
    }
  }
}
