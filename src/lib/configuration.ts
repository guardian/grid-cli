import * as fs from 'fs'
import path from 'path'

import { Config, ProfileConfig } from '../types/config'

class Configuration {
  private static readonly configDirectory = path.join(process.env.HOME || '', '.gu')
  private static readonly filePath = path.join(Configuration.configDirectory, 'grid-cli-config.json')

  public isValid: boolean
  public exists: boolean
  public config?: Config

  constructor() {
    this.exists = fs.existsSync(Configuration.filePath)

    if (this.exists) {
      // TODO enforce stricter validation
      // TODO use JSON.parse(fs.readFile(x))
      this.config = require(Configuration.filePath) as Config
      this.isValid = true
    } else {
      this.isValid = false
    }
  }

  public addProfile = (newProfile: ProfileConfig) => {
    const updatedConfig: Config = this.isValid ?
      { profiles: this.squashProfiles(this.config!.profiles, newProfile) } :
      { profiles: [newProfile] }

    if (!fs.existsSync(Configuration.configDirectory)) {
      fs.mkdirSync(Configuration.configDirectory)
    }

    fs.writeFileSync(Configuration.filePath, JSON.stringify(updatedConfig))
    return newProfile
  }

  public getProfile = (name: string) => {
    if (!this.isValid) {
      return
    }

    return this.config!.profiles.find(_ => _.name === name)
  }

  private readonly squashProfiles = (profiles: ProfileConfig[], newProfileConfig: ProfileConfig) => {
    const shouldReplaceProfile = profiles.find(_ => _.name === newProfileConfig.name)

    if (!shouldReplaceProfile) {
      return [...profiles, newProfileConfig]
    }

    return profiles.reduce((acc: ProfileConfig[], profileConfig) => {
      const profileToKeep = profileConfig.name === newProfileConfig.name ? newProfileConfig : profileConfig
      return [...acc, profileToKeep]
    }, [])
  }
}

export default Configuration
