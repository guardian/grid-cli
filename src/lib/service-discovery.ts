import { URL } from 'url'

import { Services } from '../types/service'

import Http from './http'

class ServiceDiscovery {
  public services?: Services
  private readonly http: Http
  private readonly rootUrl: URL

  constructor(http: Http, rootUrl: URL) {
    this.http = http
    this.rootUrl = rootUrl
  }

  async discover() {
    this.services = await this.http.get(this.rootUrl).then(_ => _.json())
    return this
  }

  getLink = (rel: string) => {
    this.ensureDiscoverCalled()
    return this.services!.links.find(_ => _.rel === rel)
  }

  private readonly ensureDiscoverCalled = () => {
    if (!this.services) {
      throw new Error('Services not discovered - call `.discover` first')
    }
  }
}

export default ServiceDiscovery
