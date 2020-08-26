import {flags} from '@oclif/command'
import {URL} from 'url'

import HttpCommand from '../../base-commands/http'
import ServiceDiscovery from '../../lib/service-discovery'
import {Service} from '../../types/service'

export default class CollectionAddRoot extends HttpCommand {
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
    const {args} = this.parse(CollectionAddRoot)

    const profile = this.profile!
    const http = this.http!

    const serviceDiscovery = await new ServiceDiscovery(http, profile.mediaApiHost).discover()
    const collectionsRoot = serviceDiscovery.getLink('collections')
    const searchRoot = serviceDiscovery.getLink('search')
    if (!collectionsRoot || !searchRoot) {
      this.error('collections link not found', {exit: 1})
    }

    this.log(`Getting images in current collection, ${args.from}`)

    // Fetch the images in the current collection.

    let images = [] as any
    let pageNo = 0
    let totalImages = 0

    while (pageNo === 0 || images.length < totalImages) {
      const results = await this.fetchImagesForCollection(searchRoot, args.from, pageNo)
      totalImages = results.totalImages
      images = images.concat(results.data)
      this.log(`Fetched ${images.length} of ${totalImages} images`)
    }

    if (!images.length) {
      this.log(`No images found for collection ${args.from}, stopping.`)
      return
    }

    // Add images to new collection
    for (const [index, image] of images.entries()) {
      this.log(`Adding image with id ${image.data.id} to new collection ${args.to} (${index + 1} of ${images.length})`)
      await this.addImageToCollection(collectionsRoot, args.to, image.data.id)
    }

    // Remove old collection from images
    for (const [index, image] of images.entries()) {
      this.log(`Remove image with id ${image.data.id} from old collection ${args.to} (${index + 1} of ${images.length})`)
      await this.removeImageFromCollection(collectionsRoot, args.to, image.data.id)
    }

    this.log(`All images have been moved from collection ${args.from} to new collection ${args.to}`)
  }

  private readonly fetchImagesForCollection = (searchRoot: Service, collectionName: string, pageNo: number) => {
    const searchParams = new URLSearchParams()
    searchParams.append('~', collectionName)
    searchParams.append('page', pageNo.toString())
    const imagesUrl = new URL(`${searchRoot!.href.toString()}?${searchParams.toString()}`)
    return this.http!.post(imagesUrl).then(_ => _.json())
  }

  private readonly addImageToCollection = (collectionsRoot: Service, collectionName: string, imageId: string) => {
    const collectionsUrl = new URL(`${collectionsRoot.href.toString()}/images/${imageId}`, JSON.stringify({data: collectionName}))
    return this.http!.post(collectionsUrl).then(_ => _.json())
  }

  private readonly removeImageFromCollection = (collectionsRoot: Service, collectionName: string, imageId: string) => {
    const collectionsUrl = new URL(`${collectionsRoot.href.toString()}/images/${imageId}`, JSON.stringify({data: collectionName}))
    return this.http!.delete(collectionsUrl).then(_ => _.json())
  }
}
