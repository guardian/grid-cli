import { Flags } from '@oclif/core'
import { get } from 'lodash'
import terminalImage from 'terminal-image'
import terminalLink from 'terminal-link'

import HttpCommand from './http'
import type { PageInfo } from '../types/paging'

export default abstract class ApiCommand extends HttpCommand {
  static flags = {
    ...HttpCommand.flags,
    field: Flags.string({
      char: 'f',
      description: 'key or link name to print from each returned image, if none given then image will be output as json',
      multiple: true,
    }),
    thumbnail: Flags.boolean({
      char: 't',
      description: 'show a thumbnail',
    }),
  }

  protected async printImages(images: any[], field: string[] | undefined, thumbnail: boolean) {
    const output = Promise.all(images.map(async image => {
      const out = field === undefined ? JSON.stringify(image, null, 2) :
        field.map(f => {
          const v = get(image, f) ?? get(image.data, f)
          if (v) return v
          const links = ((image.links || []) as unknown as { rel: string, href: string }[])
          const link = links.find(({ rel }) => rel === f)
          if (link) {
            return terminalLink(link.rel, link.href)
          }

          throw new Error(`No field named ${f} for image ${image}`)
        }).join('\t')

      if (!thumbnail) {
        return [out]
      }

      const url = image?.data?.thumbnail?.secureUrl ?? ''
      try {
        const resp = await this.http!.get(new URL(url))
        const buffer = await resp.buffer()
        const thumb = await terminalImage.buffer(buffer, { height: '20%' })
        return [out, thumb]
      } catch {
        return [out]
      }
    }))

    for (const [fields, thumb] of await output) {
      this.log(fields)
      if (thumb) {
        this.log(thumb)
      }
    }
  }

  protected async fetchImage(id: string, suffix?: string) {
    const mainEndpoint = `${this.profile!.mediaApiHost}images`

    const endpoint = id ? `${mainEndpoint}/${id}${suffix ? `/${suffix}` : ''}` : mainEndpoint

    const url = new URL(endpoint)

    return this.http!.get(url).then(_ => _.json())
  }

  protected async search(q: string, pageInfo?: PageInfo) {
    const mainEndpoint = `${this.profile!.mediaApiHost}images`

    const paging = pageInfo === undefined ? '' : `&offset=${pageInfo.page * pageInfo.size}&length=${pageInfo.size}`

    const endpoint = `${mainEndpoint}?q=${q}${paging}`
    const url = new URL(endpoint)
    return this.http!.get(url).then(_ => _.json())
  }
}
