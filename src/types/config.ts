interface ProfileConfig {
  name: string,
  mediaApiHost: string,
  apiKey: string
}

interface Config {
  profiles: ProfileConfig[]
}

export {
  ProfileConfig,
  Config
}
