import {flags} from '@oclif/command'
import {get} from 'lodash'
import terminalImage from 'terminal-image'
import terminalLink from 'terminal-link'

import HttpCommand from './http'

export default abstract class ApiCommand extends HttpCommand {
  static flags = {
    ...HttpCommand.flags,
    field: flags.string({
      char: 'f',
      description: 'key or link name to print from each returned image, if none given then image will be output as json',
      multiple: true,
    }),
    thumbnail: flags.boolean({
      char: 't',
      description: 'show a thumbnail'
    })
  }

  protected async printImages(images: any[], field: string[] | undefined, thumbnail: boolean) {
    const output = Promise.all(images.map(async image => {
      const out = field === undefined ? JSON.stringify(image, null, 2) :
        field.map(f => {
          const v = get(image, f)
          if (v) return v
          const links = ((image.links || []) as unknown as {rel: string, href: string}[])
          const link = links.find(({rel}) => rel === f)
          if (link) {
             return terminalLink(link.rel, link.href)
          }
        }).join('\t')

      if (!thumbnail) {
        return [out]
      }
      const url = image?.data?.thumbnail?.secureUrl ?? ''
      try {
        const resp = await this.http!.get(new URL(url))
        const buffer = await resp.buffer()
        const thumb = await terminalImage.buffer(buffer, {height: '20%'})
        return [out, thumb]

      } catch {
        return [out]
      }
    }))
    ;
    (await output).forEach(([fields, thumb]) => {
      this.log(fields)
      if (thumb) {
        this.log(thumb)
      }
    })
  }

  protected async fetchImage(id: string, suffix?: string) {
    const mainEndpoint = `${this.profile!.mediaApiHost}images`

    const endpoint = id ? `${mainEndpoint}/${id}${suffix ? `/${suffix}` : ''}` : mainEndpoint

    const url = new URL(endpoint)

    return this.http!.get(url).then(_ => _.json())
  }

  protected async search(q: string) {
    const mainEndpoint = `${this.profile!.mediaApiHost}images`

    const endpoint = `${mainEndpoint}?q=${q}`
    const url = new URL(endpoint)
    return this.http!.get(url).then(_ => _.json())
  }
}
