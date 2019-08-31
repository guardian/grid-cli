import fetch from 'node-fetch'

import {ApiKey} from '../types/config'

class Http {
  private readonly apiKey: ApiKey

  constructor(apiKey: ApiKey) {
    this.apiKey = apiKey
  }

  public get = (url: URL) => {
    return fetch(url.toString(), {
      method: 'GET',
      headers: this.headers()
    }).then(_ => _.json())
  }

  public post = (url: URL, body: any) => {
    return fetch(url.toString(), {
      method: 'POST',
      headers: this.headers(),
      body
    }).then(_ => _.json())
  }

  public put = (url: URL, body: any) => {
    return fetch(url.toString(), {
      method: 'PUT',
      headers: this.headers(),
      body
    }).then(_ => _.json())
  }

  public patch = (url: URL, body: any) => {
    return fetch(url.toString(), {
      method: 'PATCH',
      headers: this.headers(),
      body
    }).then(_ => _.json())
  }

  public delete = (url: URL) => {
    return fetch(url.toString(), {
      method: 'DELETE',
      headers: this.headers()
    }).then(_ => _.json())
  }

  private headers() {
    return {
      'X-Gu-Media-Key': this.apiKey,
      Accept: 'application/vnd.argo+json',
      'Content-Type': 'application/json'
    }
  }
}

export default Http
