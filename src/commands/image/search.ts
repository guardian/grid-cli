import { flags} from '@oclif/command'
import { get } from 'lodash'
import ApiCommand from '../../base-commands/api'
import ImageGet from './get'

export default class ImageSearch extends ApiCommand {
  static description = 'Search for an Image from the API'

  static flags = {
    ...ApiCommand.flags,
    help: flags.help({char: 'h'}),
    field: flags.string({
      char: 'f',
      description: 'key to print from each returned image, !q gives current query',
      multiple: true
    })
  }

  static args = [
    {name: 'q', description: 'Search query'}
  ]


async run() {
  const {args, flags} = this.parse(ImageSearch)
  const {field} = flags
  const { q } = args

  const printImageWithFields = (image: any) => {
    const values = field.map((f: string) => f === '!g' ? q : get(image, f))
    this.log(values.join('\t'))
  }
  const printImageJSON = (image: any) => this.log(JSON.stringify(image, null, 2))

  const printImage = field.length !== 0 ? printImageWithFields : printImageJSON

  const results = await this.search(q)


  results.data.map(printImage)

}
}
