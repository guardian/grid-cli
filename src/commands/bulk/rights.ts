import { Flags } from '@oclif/core'
import { createWriteStream, WriteStream } from 'fs'
import lines from 'lines-async-iterator'

import ApiCommand from '../../base-commands/api'

export default class BulkRights extends ApiCommand {
  static description =
    'Reads a text file containing image ids, and sets their usage rights.'

  static rights = {
    noRights: {},
    chargeable: { category: 'chargeable' },
  }

  static rightsTuples = Object.entries(
    BulkRights.rights
  ).map(([name, data]) => [name, JSON.stringify(data)])

  static flags = {
    ...ApiCommand.flags,
    help: Flags.help({ char: 'h' }),
  }

  static args = [
    { name: 'input', description: 'file to read, containing one grid id per line', required: true },
    {
      name: 'rights',
      description: 'usageRights to set',
      required: true,
      options: Object.keys(BulkRights.rights),
    },
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

  getRights(json: string): (keyof typeof BulkRights.rights) | string {
    return BulkRights.rightsTuples
      .filter(([, j]) => j === json)
      .map(([name]) => name)[0] ?? json
  }

  async updateImage(id: string, updateMessage: string, output: WriteStream, failures: WriteStream) {
    const image = await this.fetchImage(id)
    if (!image) {
      this.log(`Error retreiving ${id}`)
      failures.write(`${id}\n`)
      output.write(`${id}\t ERROR\n`)
      return false
    }
    if ('errorMessage' in image) {
      this.log(`Could not find ${id} ${image.errorMessage}`)
      failures.write(`${id}\n`)
      output.write(`${id}\t ${image.errorKey}\n`)
      return false
    }
    const imageRightsJSON = JSON.stringify(image.data.usageRights)

    const imageRights = this.getRights(imageRightsJSON)

    const edit = image.links.filter((_: { rel: string }) => _.rel === 'edits')[0].href

    const endpoint = new URL(`${edit}/usage-rights`)
    try {
      const response = await this.http!.put(endpoint, updateMessage)

      if (response.status !== 200) {
        this.log(`${id} update failed with status code ${response.status}`)
        failures.write(`${id}\m`)
        output.write(`${id}\t FAILED\n`)
        this.log(await response.text())
        return false
      }

      const responseData = await response.json()
      const newRights = this.getRights(JSON.stringify(responseData.data))
      this.log(`Succesfully updated ${id} from ${imageRights} to ${newRights}`)
      output.write(`${id}\t SUCCESS\t ${newRights}\n`)
    } catch {
      this.log(`Update failed on ${id}`)
      failures.write(`${id}\m`)
      output.write(`${id}\t FAILED\n`)
    }
  }

  async run() {
    const http = this.http
    if (!http) {
      this.log('No http, no anything.')
      return false
    }

    const { args } = await this.parse(BulkRights)

    const failures = createWriteStream(args.failures)

    const output = createWriteStream(args.output)

    const file = args.input

    const newRights =
      args.rights in BulkRights.rights &&
      BulkRights.rights[args.rights as keyof typeof BulkRights.rights]

    const updateMessage = JSON.stringify({ data: newRights })

    this.log(`Reading ${file}, updating images found to ${args.rights}`)

    for await (const id of lines(file)) {
      await this.updateImage(id, updateMessage, output, failures)
    }
  }
}
