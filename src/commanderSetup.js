import { Command } from 'commander'

const program = new Command()

program
  .option('--first')
  .option('-u, --url <value...>')
program.parse()

export const options = program.opts()
