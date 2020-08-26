import {flags} from '@oclif/command'
import {URL} from 'url'

import HttpCommand from '../../base-commands/http'
import ServiceDiscovery from '../../lib/service-discovery'
import {Service} from '../../types/service'

export default class CollectionMoveImages extends HttpCommand {
  static description = 'Move images from one collection to another'

  static flags = {
    ...HttpCommand.flags,
    help: flags.help({char: 'h'})
  }

  static args = [
    {name: 'from', description: 'Collection to rename', required: true},
    {name: 'to', description: 'Name of new collection', required: true}
  ]

  async run() {
    const {args} = this.parse(CollectionMoveImages)

    const profile = this.profile!
    const http = this.http!

    const serviceDiscovery = await new ServiceDiscovery(http, profile.mediaApiHost).discover()
    const collectionsRoot = serviceDiscovery.getLink('collections')
    if (!collectionsRoot) {
      this.error('collections link not found', {exit: 1})
    }

    // Make sure both from and to collections exist. This guards against casing issues,
    // as the search for collections is case-insensitive, and we might end up adding
    // images to collections that don't exist.
    const collections = await this.fetchCollections(collectionsRoot)
    if (!collections.data.children.find((collection: any) => collection.data.basename === args.from)) {
      this.error(`Collection with basename ${args.from} not found.`)
    }
    if (!collections.data.children.find((collection: any) => collection.data.basename === args.to)) {
      this.error(`Collection with basename ${args.to} not found.`)
    }

    this.log(`Getting images in collection: ${args.from}`)

    // Fetch the images in the current collection.
    let images = [] as any
    let pageNo = 0
    let totalImages = 0

    while (pageNo === 0 || images.length < totalImages) {
      const results = await this.fetchImagesForCollection(args.from, pageNo)
      totalImages = results.total
      images = images.concat(results.data)
      pageNo++
      this.log(`Fetched ${images.length} of ${totalImages} images`)
    }

    if (!images.length) {
      this.log(`No images found for collection: ${args.from}, stopping.`)
      return
    }

    // Add those images to the new collection
    for (const [index, image] of images.entries()) {
      this.log(`Adding image with id ${image.data.id} to collection: ${args.to} (${index + 1} of ${images.length})`)
      const response: any = await this.addImageToCollection(collectionsRoot, args.to, image.data.id)
      if (response.errorKey) {
        this.error(`Error adding image ${image.data.id} to collection: ${args.to} – response from API was ${response.errorMessage}`)
      }
    }

    // Remove those images from the old collection
    for (const [index, image] of images.entries()) {
      this.log(`Removing image with id ${image.data.id} from collection: ${args.from} (${index + 1} of ${images.length})`)
      const response: any = await this.removeImageFromCollection(collectionsRoot, args.from, image.data.id)
      if (response.errorKey) {
        this.error(`Error removing image ${image.data.id} from collection: ${args.from} – response from API was ${response.errorMessage}`)
      }
    }

    this.log(`All images have been moved from collection: ${args.from} to collection: ${args.to}`)
  }

  private readonly fetchImagesForCollection = (collectionName: string, pageNo: number) => {
    const searchParams = new URLSearchParams()
    searchParams.append('page', pageNo.toString())
    searchParams.append('q', `~${collectionName}`)
    const url = new URL(`${this.profile!.mediaApiHost}images?${searchParams.toString()}`)
    return this.http!.get(url).then(_ => _.json())
  }

  private readonly fetchCollections = (collectionsRoot: Service) => {
    const url = new URL(`${collectionsRoot!.href.toString()}/collections`)
    return this.http!.get(url).then(_ => _.json())
  }

  private readonly addImageToCollection = (collectionsRoot: Service, collectionName: string, imageId: string) => {
    const url = new URL(`${collectionsRoot.href.toString()}/images/${imageId}`)
    return this.http!.post(url, JSON.stringify({data: [collectionName]})).then(_ => _.json())
  }

  private readonly removeImageFromCollection = (collectionsRoot: Service, collectionName: string, imageId: string) => {
    const url = new URL(`${collectionsRoot.href.toString()}/images/${imageId}/${collectionName}`)
    return this.http!.delete(url).then(_ => _.json())
  }
}
