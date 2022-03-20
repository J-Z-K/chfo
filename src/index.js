#!/usr/bin/env node
import { options } from './commanderSetup.js'
import Configstore from 'configstore'
import { initInquirer } from './ui.js'

const config = new Configstore('tree')

initInquirer()

// blockSites(sitesToBlock)
// setTimeout(unblockSites, 1000)

// // watch for file changes to prevent manipulation ;)
