#!/usr/bin/env node
import { options } from './commanderSetup.js'

import { initInquirer } from './ui.js'
import { makeTempFile } from './hosts.js'
import './cleanUp.js'

makeTempFile()

initInquirer()

// blockSites(sitesToBlock)
// setTimeout(unblockSites, 1000)

// // watch for file changes to prevent manipulation ;)
