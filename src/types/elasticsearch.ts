interface RepositorySettings { }

interface S3RepositorySettings extends RepositorySettings {
  bucket: string,
  base_path: string,
  server_side_encryption: Boolean,
  region: string
}

interface Repository {
  type: string,
  settings: RepositorySettings
}

interface Repositories {
  [name: string]: Repository
}

export {
  Repositories,
  Repository,
  RepositorySettings,
  S3RepositorySettings
}
