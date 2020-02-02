import {Command, flags} from '@oclif/command'
import {URL} from 'url'
import Try from '../../../util/try'
import Elasticsearch from '../../../lib/elasticsearch'

export default class ElasticsearchSnapshotListRepositories extends Command {
  static description = 'List elasticsearch snapshot repositories'

  static flags = {
    help: flags.help({char: 'h'}),
    target: flags.string({char: 't', required: true})
  }

  async run() {
    const { flags } = this.parse(ElasticsearchSnapshotListRepositories)

    const maybeUrl = new Try(() => new URL(flags.target))

    if (!maybeUrl.isSuccess) {
      this.error(`${flags.target} is not a valid url`, { exit: 1 })
    }

    const es = new Elasticsearch(maybeUrl.get())
    const repos = await es.listRepositories()
    this.log(JSON.stringify(repos))
  }
}
