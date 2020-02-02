import { Client } from '@elastic/elasticsearch'
import { Repositories, Repository } from '../types/elasticsearch'
import { SnapshotCreateRepository } from '@elastic/elasticsearch/api/requestParams'

class Elasticsearch {
  private readonly host: URL
  private readonly client: Client

  constructor(host: URL) {
    this.host = host
    this.client = new Client({ node: host.toString()})
  }

  public async listRepositories(): Promise<Repositories> {
    const response = await this.client.snapshot.getRepository()
    return response.body
  }

  public async createRepository(name: string, repository: Repository) {
    const settings: SnapshotCreateRepository<Repository> = {
      repository: name,
      body: repository
    }
console.log(settings)
    const response = await this.client.snapshot.createRepository(settings)

    return response.body
  }
}

export default Elasticsearch
