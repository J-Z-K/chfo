import Configstore from 'configstore'

export const storage = new Configstore('tree')

export const getBlockedSites = () => storage.get('blockedSites')

export const setBlockedSites = (sites) => {
  const blockedSites = new Set(getBlockedSites())
  sites.split(' ').forEach(host => blockedSites.add(host))
  const toStorage = [...blockedSites]
  storage.set('blockedSites', toStorage)
}

export const removeFromBlockedSites = (sitesToRemove) => {
  const blockedSites = new Set(getBlockedSites())
  sitesToRemove.forEach(host => blockedSites.delete(host))
  const toStorage = [...blockedSites]
  storage.set('blockedSites', toStorage)
}
