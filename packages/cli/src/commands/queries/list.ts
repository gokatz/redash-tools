import Command, {flags} from '@oclif/command'
import {queriesClient} from 'redash-js-client'
import {stringify} from '../../utils'
import {base} from '../../flags/base'

export default class QueriesList extends Command {
    static description = 'Returns a paginated array of query objects'

    static examples = ['$ redash-cli queries:list']

    static flags = {
      ...base,
      page_size: flags.integer({char: 's', description: 'page size', default: 25}),
      page: flags.integer({char: 'p', description: 'page index', default: 1}),
      query: flags.string({char: 'q', description: 'search query string'}),
    }

    static args = []

    async run() {
      const {flags} = this.parse(QueriesList)

      const client = queriesClient({host: flags.hostname!, token: flags.token})
      const result = await client.list({page: flags.page, page_size: flags.page_size, q: flags.query})

      this.log(stringify(result))
    }
}
