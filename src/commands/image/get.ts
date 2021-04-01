import {flags} from '@oclif/command'

import ApiCommand from '../../base-commands/api'

export default class ImageGet extends ApiCommand {
  static description = 'Get an Image from the API'

  static flags = {
    ...ApiCommand.flags,
    help: flags.help({ char: 'h' }),
    hydrate: flags.boolean({
      description: "Gets fields which are returned as uris."
    })
  }

  static args = [
    {name: 'id', description: 'ID of image'}
  ]

  async run() {
    const {args:{id},flags:{field,thumbnail, hydrate}} = this.parse(ImageGet)


    const image = await this.fetchImage(id)

    if (!hydrate) {
      await this.printImages([image],field,thumbnail)
return
    }
    const data = await this.hydrate(image.data)
    await this.printImages([{...image,data}],field,thumbnail)

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
        return [key, { ...value, data }]
      } catch (e) {
        return [key, value]
      }
    })
    return Object.fromEntries(await Promise.all(hydrated))
  }
}
