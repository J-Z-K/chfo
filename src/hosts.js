import * as fs from 'fs/promises'
const hostsFile = '/etc/hosts_test'

const checkFile = async () => {
  try {
    await fs.access(hostsFile, 2)
  } catch (err) {
    console.log(err)
    process.exit()
  }
}

export const makeTempFile = async () => {
  await checkFile()
  fs.copyFile(hostsFile, `${hostsFile}_temp`)
}

export const restoreTempFile = async () => {
  fs.rename(`${hostsFile}_temp`, hostsFile)
}

export const blockSites = async (sites) => {
  await checkFile()
  sites.map((site) => fs.appendFile(hostsFile, `\n127.0.0.1 ${site}`))
}
