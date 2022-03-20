import * as fs from 'fs/promises'
const hostsFile = '/etc/hosts_test'
const sitesToBlock = ['reddit.com', 'netfix.com', 'fajkowo.pl']

const checkFile = async () => {
  try {
    await fs.access(hostsFile, 2)
  } catch (err) {
    console.log(err)
    process.exit()
  }
}

const blockSites = async (sites) => {
  checkFile()
  const stats = await fs.stat(hostsFile)
  global.fileSize = stats.size
  sites.map(async (site) => {
    fs.appendFile(hostsFile, `\n127.0.0.1 ${site}`)
  })
}

const unblockSites = async () => {
  checkFile()
  console.log(global.fileSize)
  if (global.fileSize) {
    fs.truncate(hostsFile, global.fileSize)
  }
}
