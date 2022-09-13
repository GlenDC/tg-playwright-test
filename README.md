# TG — Playwright Test

A simple project attempting to integrate Playwright and Testground.

## plans/playwright-test

A first basic test just to check if we can run a docker container,
with a server and a playwright script in one.

Prerequisites:
- `testground daemon` is running
- Docker

The following test case is implemented:

```
testground run single --plan playwright-test --testcase basicExpress --instances 1 --builder docker:generic --runner local:docker
```

If all is well you should in your daemon shell something along the following:

```
Sep 13 23:10:23.291048  INFO    0.9657s      OTHER << single[000] (26682e) >> yarn run v1.22.19
Sep 13 23:10:23.404466  INFO    1.0791s      OTHER << single[000] (26682e) >> $ node testground.js
Sep 13 23:10:24.501150  INFO    2.1877s      START << single[000] (26682e) >> {"plan":"playwright-test","case":"basicExpress","run":"ccggrd3hkdfiu8knc91g","outputs_path":"/outputs","instances":1,"group":"single","group_instances":1,"network":"16.1.0.0/16","start_time":"0001-01-01T00:00:00Z"}
Sep 13 23:10:24.555217  INFO    2.2217s    MESSAGE << single[000] (26682e) >> server is listening at: http://127.0.0.1:3001
Sep 13 23:10:24.555314  INFO    2.2237s    MESSAGE << single[000] (26682e) >> before runPlaywrightTest
Sep 13 23:10:24.555393  INFO    2.2307s    MESSAGE << single[000] (26682e) >> playwright: launching chromium and opening new page
Sep 13 23:10:25.326038  INFO    3.0157s    MESSAGE << single[000] (26682e) >> playwright: visiting on new page: http://127.0.0.1:3001
Sep 13 23:10:25.497906  INFO    3.1877s    MESSAGE << single[000] (26682e) >> playwright: asserting message is available on page...
Sep 13 23:10:25.526092  INFO    3.2167s         OK << single[000] (26682e) >> 
Sep 13 23:10:25.624458  INFO    all outcomes are complete       {"runner": "local:docker", "run_id": "ccggrd3hkdfiu8knc91g"}
Sep 13 23:10:25.637589  INFO    3.3122s      OTHER << single[000] (26682e) >> Done in 2.37s.
```

Note, first run:

```
testground plan import --from ./plans/playwright-test
```

You can run this also locally using the command:

```
yarn run testlocal
```

> This assumes that you already have ran `yarn install` prior to making this call.
