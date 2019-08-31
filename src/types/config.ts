interface ProfileConfig {
  name: string,
  mediaApiHost: URL,
  apiKey: string
}

interface Config {
  profiles: ProfileConfig[]
}

export {
  ProfileConfig,
  Config
}
