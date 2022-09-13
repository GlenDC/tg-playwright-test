A simple project attempting to integrate Cypress and Testground.

Prerequisites:
- `testground daemon` is running
- Docker

The following test case is implemented:

```
testground run single --plan playwright-test --testcase basicExpress --instances 1 --builder docker:generic --runner local:docker
```

!! Note, first run:

```
testground plan import --from ./plans/playwright-test
```
