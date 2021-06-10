import Listr = require('listr');
import Command from '@oclif/command'
import {base} from '../../flags'
import {dashboardOne, DashboardSnapshotContext, initClient} from '../../tasks'
import {stringify} from '../../utils'
import {validateToken} from '../../validations'

export default class DashboardOne extends Command {
  static description = 'Returns a collection of dashboard query pngs'

  static examples = [
    '$ redash-cli dashboard:one my-dashboard-slug',
  ]

  static flags = {
    ...base,
  }

  static args = [
    {
      name: 'slug',
      required: true,
      description: 'dashboard slug',
    },
  ]

  async run() {
    const {flags, args} = this.parse(DashboardOne)

    validateToken(this, flags.token)

    const context = await new Listr<DashboardSnapshotContext>([
      initClient(flags.hostname!, flags.token!),
      dashboardOne(args.slug),
    ], {concurrent: false}).run()

    this.log(stringify(context.dashboard))

    this.exit()
  }
}
