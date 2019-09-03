import {URL} from 'url'

type ApiKey = string

interface ProfileConfig {
  name: string,
  mediaApiHost: URL,
  apiKey: ApiKey
}

interface Config {
  profiles: ProfileConfig[]
}

export {
  ApiKey,
  ProfileConfig,
  Config
}
