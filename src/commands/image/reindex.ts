import { flags } from '@oclif/command'
import * as colors from 'colors/safe'
import * as diff from 'diff'
import { Change } from 'diff'

import ApiCommand from '../../base-commands/api'

export default class ImageReingest extends ApiCommand {
  static description = 'Reindex an image already present in the images bucket'

  static flags = {
    ...ApiCommand.flags,
    help: flags.help({ char: 'h' }),
    dryRun: flags.boolean({
      name: 'dry-run',
      description: 'Display the result of the reingestion only',
      char: 'd'
    }),
    compare: flags.boolean({
      name: 'compare',
      description: 'Do a dry run, and display the difference between the result and the data returned for this image from media-api',
      char: 'c'
    })
  }

  static args = [
    { name: 'id', description: 'ID of image', required: true },
    {
      name: 'imageLoaderHost',
      description: 'The root for the Image Loader service',
      required: true
    }
  ]

  async run() {
    const { args, flags } = this.parse(ImageReingest)

    const imageId: string = args.id
    const imageLoaderHost: string = args.imageLoaderHost

    const http = this.http!
    const dryRun = flags.dryRun
    const compare = flags.compare

    const endpoint = `${imageLoaderHost}images/project/${imageId}`
    const url = new URL(endpoint)
    const projection: object = await http.get(url).then(_ => _.json())

    if (dryRun || compare) {
      return this.printProjection(imageId, projection, !!compare)
    }

    return this.addProjectionToKinesis(projection)
  }

  private async printProjection(
    id: string,
    projection: object,
    diffAgainstES: boolean
  ) {
    if (diffAgainstES) {
      const image = await this.fetchImage(id)
      const imageDiff = diff.diffJson(image.data, projection)
      this.printDiff(imageDiff)
    } else {
      console.log(projection)
    }
  }

  private addProjectionToKinesis(projection: unknown) {
    console.log('Not yet implemented')
  }

  private printDiff(changeSet: Change[]) {
    changeSet.forEach(change => {
      const color = change.added ? 'green' : change.removed ? 'red' : 'grey'
      console.log(colors[color](change.value))
    })
  }
}
