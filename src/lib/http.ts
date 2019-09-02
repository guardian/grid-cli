import {createWriteStream} from 'fs'
import fetch from 'node-fetch'
import {pipeline} from 'stream'
import {promisify} from 'util'

import {ApiKey} from '../types/config'

class Http {
  private readonly apiKey: ApiKey

  constructor(apiKey: ApiKey) {
    this.apiKey = apiKey
  }

  // TODO be stricter on `method` type
  // public request = (method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', url: URL, body: any) => {
  public request = (method: string, url: URL, body: any) => {
    switch (method.toUpperCase()) {
    case 'POST':
      return this.post(url, body)
    case 'PUT':
      return this.put(url, body)
    case 'PATCH':
      return this.patch(url, body)
    case 'DELETE':
      return this.delete(url)
    default:
      return this.get(url)
    }
  }

  public async download(url: URL, location: string) {
    // inspired by https://github.com/bitinn/node-fetch/issues/375#issuecomment-495953540
    const response = await fetch(url.toString())
    if (!response.ok) throw new Error(`unexpected response ${response.statusText}`)
    const streamPipeline = promisify(pipeline)
    await streamPipeline(response.body, createWriteStream(location))
    return location
  }

  public get = (url: URL) => {
    return fetch(url.toString(), {
      method: 'GET',
      headers: this.headers()
    }).then(_ => _.json())
  }

  public post = (url: URL, body?: any) => {
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
