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
    const collectionFrom = collections.data.children.find((collection: any) => collection.data.basename === args.from)?.data
    const collectionTo = collections.data.children.find((collection: any) => collection.data.basename === args.to)?.data
    if (!collectionFrom) {
      this.error(`Collection with basename ${collectionFrom.baseName} not found.`)
    }
    if (!collectionTo) {
      this.error(`Collection with basename ${collectionTo.baseName} not found.`)
    }

    this.log(`Getting images in collection: ${collectionFrom.baseName}`)

    // Fetch the images in the current collection.
    let images = [] as any
    let pageNo = 0
    let totalImages = 0

    while (pageNo === 0 || images.length < totalImages) {
      const results = await this.fetchImagesForCollection(collectionFrom, pageNo)
      totalImages = results.total
      images = images.concat(results.data)
      pageNo++
      this.log(`Fetched ${images.length} of ${totalImages} images`)
    }

    if (!images.length) {
      this.log(`No images found for collection: ${collectionFrom}, stopping.`)
      return
    }

    // Add those images to the new collection
    for (const [index, image] of images.entries()) {
      this.log(`Adding image with id ${image.data.id} to collection: ${collectionTo.baseName} (${index + 1} of ${images.length})`)
      const response: any = await this.addImageToCollection(collectionsRoot, collectionTo, image.data.id)
      if (response.errorKey) {
        this.error(`Error adding image ${image.data.id} to collection: ${collectionTo.baseName} – response from API was ${response.errorMessage}`)
      }
    }

    // Remove those images from the old collection
    for (const [index, image] of images.entries()) {
      this.log(`Removing image with id ${image.data.id} from collection: ${collectionFrom.baseName} (${index + 1} of ${images.length})`)
      const response: any = await this.removeImageFromCollection(collectionsRoot, collectionFrom, image.data.id)
      if (response.errorKey) {
        this.error(`Error removing image ${image.data.id} from collection: ${collectionFrom.baseName} – response from API was ${response.errorMessage}`)
      }
    }

    this.log(`All images have been moved from collection: ${collectionFrom.baseName} to collection: ${collectionTo.baseName}`)
  }

  private readonly fetchImagesForCollection = (collection: any, pageNo: number) => {
    const searchParams = new URLSearchParams()
    searchParams.append('page', pageNo.toString())
    searchParams.append('q', `~${this.getCollectionPathStr(collection)}`)
    const url = new URL(`${this.profile!.mediaApiHost}images?${searchParams.toString()}`)
    return this.http!.get(url).then(_ => _.json())
  }

  private readonly fetchCollections = (collectionsRoot: Service) => {
    const url = new URL(`${collectionsRoot!.href.toString()}/collections`)
    return this.http!.get(url).then(_ => _.json())
  }

  private readonly addImageToCollection = (collectionsRoot: Service, collection: any, imageId: string) => {
    const url = new URL(`${collectionsRoot.href.toString()}/images/${imageId}`)
    return this.http!.post(url, JSON.stringify({data: collection.data.data.path})).then(_ => _.json())
  }

  private readonly removeImageFromCollection = (collectionsRoot: Service, collection: any, imageId: string) => {
    const url = new URL(`${collectionsRoot.href.toString()}/images/${imageId}/${this.getCollectionPathStr(collection)}`)
    return this.http!.delete(url).then(_ => _.json())
  }

  private readonly getCollectionPathStr = (collection: any) => collection.data.data.path.join('/')
}
