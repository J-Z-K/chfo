import { restoreTempFile } from './hosts.js'

const cleanUpServer = () => {
    restoreTempFile()
}

[`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
    process.on(eventType, cleanUpServer.bind(null, eventType));
})
