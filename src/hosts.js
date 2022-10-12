import * as fs from 'fs/promises'
import { storage } from './storage.js'
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

export const blockSites = async (sitesToBlock) => {
  const toStorage = [...sitesToBlock]
  storage.set('blockedSites', toStorage)
  await checkFile()
  sitesToBlock.map((site) => fs.appendFile(hostsFile, `\n127.0.0.2 ${site}`))
}
