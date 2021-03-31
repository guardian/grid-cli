import {flags} from '@oclif/command'

import ApiCommand from '../../base-commands/api'

export default class ImageGet extends ApiCommand {
  static description = 'Get an Image from the API'

  static flags = {
    ...ApiCommand.flags,
    help: flags.help({ char: 'h' }),
    hydrate: flags.boolean({
      description: "Gets fields which are returned as uri's."
    })
  }

  static args = [
    {name: 'id', description: 'ID of image'}
  ]

  async run() {
    const {args:{id},flags:{field,thumbnail}} = this.parse(ImageGet)


    const image = await this.fetchImage(id)
    const hydrated = await this.hydrate(image)

    await this.printImages([hydrated],field,thumbnail)
  }

  async hydrate(image: any) {
    const asTuples = Object.entries(image)
    const hydrated = asTuples.map(async ([key, value]) => {
      try {
        if (typeof value !== "object" || Object.keys(value!).length > 1) {
          return [key, value]
        }
        if (!value || !("uri" in value)) {
          return [key, value]
        }
        const { uri } = value as { uri: string }
        const response = await this.http!.get(new URL(uri))
        const {data} = await response.json()
        return [key, data]
      } catch (e) {
        return [key, value]
      }
    })
    return Object.fromEntries(await Promise.all(hydrated))
  }
}
