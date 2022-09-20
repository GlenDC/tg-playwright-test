const os = require('os')
const { network } = require('@testground/sdk')

export default async (runenv, client) => {
    runenv.recordMessage('before sync.newBoundClient')

    if (!runenv.testSidecar) {
        throw new Error('this test requires a sidecar.')
    }

    const netclient = network.newClient(client, runenv)

    runenv.recordMessage('before netclient.waitNetworkInitialized')
    await netclient.waitNetworkInitialized()

    const oldAddrs = os.networkInterfaces()

    const config = {
    network: 'default',
    enable: true,
    default: {
        latency: 100 * 1000 * 1000, // 100ms in nanoseconds
        bandwidth: 1 << 20 // 1 Mib
    },
    callbackState: 'network-configured',
    routingPolicy: network.DENY_ALL
    }

    runenv.recordMessage('before netclient.configureNetwork')
    await netclient.configureNetwork(config)

    const seq = await client.signalAndWait('ip-allocation', runenv.testInstanceCount)

    // Make sure that the IP addresses don't change unless we request it.
    const newAddrs = os.networkInterfaces()
    if (!sameAddrs(oldAddrs, newAddrs)) {
    throw new Error('interfaces changed')
    }

    runenv.recordMessage(`I am ${seq}`)

    const ip = [...runenv.testSubnet[0].octets.slice(0, 2), 1, seq]

    config.IPv4 = `${ip.join('.')}/${runenv.testSubnet[1]}`
    config.callbackState = 'ip-changed'

    runenv.recordMessage('before reconfiguring network')
    await netclient.configureNetwork(config)
}
