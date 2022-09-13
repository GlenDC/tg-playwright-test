const os = require('os')
const { network } = require('@testground/sdk')

const { Server } = require('./server');
const { runPlaywrightTest } = require('./playwright');

async function basicEpxressTest (runenv, client) {
  if (!runenv.testSidecar) {
    throw new Error('this test requires a sidecar.')
  }

  let server;

  try {
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

    // Make sure that the IP addresses don't change unless we request it.
    const newAddrs = os.networkInterfaces()
    if (!sameAddrs(oldAddrs, newAddrs)) {
      throw new Error('interfaces changed')
    }

    const ip = [...runenv.testSubnet[0].octets.slice(0, 2), 1, seq]

    config.IPv4 = `${ip.join('.')}/${runenv.testSubnet[1]}`
    config.callbackState = 'ip-changed'

    const serverPort = 3001;

    server = new Server();
    server.listen('0.0.0.0', serverPort);

    runenv.recordMessage('before reconfiguring network')
    await netclient.configureNetwork(config);

    const raw = ip.slice(0, 3)
    raw.push(1)
    const addr = ipaddr.fromByteArray(raw)
    runenv.recordMessage('before runPlaywrightTest')
    await runPlaywrightTest(runenv, client, `http://${addr.toString()}:${serverPort}`)
  } finally {
    if (server) {
        server.close()
    }
  }
}

function sameAddrs (a, b) {
  if (a.length !== b.length) {
    return false
  }

  a = Object.values(a)
    .flat()
    .reduce((acc, curr) => {
      if (!acc.includes(curr.cidr)) {
        acc.push(curr.cidr)
      }
      return acc
    }, [])

  b = Object.values(b).flat()

  for (const { cidr } of b) {
    if (!a.includes(cidr)) {
      return false
    }
  }

  return true
}

module.exports = basicEpxressTest
