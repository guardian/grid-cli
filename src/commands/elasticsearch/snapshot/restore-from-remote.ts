import {Command, flags} from '@oclif/command'
import Try from '../../../util/try'
import Elasticsearch from '../../../lib/elasticsearch'

export default class ElasticsearchSnapshotRestoreFromRemote extends Command {
  static description = 'Restore an elasticsearch snapshot from another cluster'

  static flags = {
    help: flags.help({char: 'h'}),
    target: flags.string({char: 't', required: true, description: 'Elasticsearch cluster to restore to'}),
    source: flags.string({char: 's', required: true, description: 'Elasticsearch cluster to restore from'}),
    sourceRepoName: flags.string({char: 'r', required: true, description: 'Source elasticsearch cluster repository name'}),
  }

  async run() {
    const {flags} = this.parse(ElasticsearchSnapshotRestoreFromRemote)

    const maybeTargetUrl = new Try(() => new URL(flags.target))
    const maybeSourceUrl = new Try(() => new URL(flags.source))

    if (!maybeTargetUrl.isSuccess) {
      this.error(`Target ${flags.target} is not a valid url`, { exit: 1 })
    }

    if (!maybeSourceUrl.isSuccess) {
      this.error(`Source ${flags.source} is not a valid url`, { exit: 1 })
    }

    const sourceEs = new Elasticsearch(maybeSourceUrl.get())
    const sourceRepos = await sourceEs.listRepositories()

    const sourceRepo = sourceRepos[flags.sourceRepoName]

    if(sourceRepo === undefined) {
      this.error(`${flags.sourceRepoName} repository not found on ${flags.source}`, { exit: 1 })
    }

    const targetEs = new Elasticsearch(maybeTargetUrl.get())
    await targetEs.createRepository(flags.sourceRepoName, sourceRepo)
    const targetRepos = await targetEs.listRepositories()

    this.log(JSON.stringify(targetRepos))
  }
}
