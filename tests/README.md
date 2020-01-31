# Running the Testcafe (end-to-end testing)

### Setup

```
# install testcafe
npm install -g testcafe

# in intro-backend repo:
rails db:test:prepare
# also run that command every time there is a db migration

# in intro-client repo:
npm install
```

### Running

```
# in intro-backend repo:
rake test_server:start

# in intro-client repo:
REACT_APP_ALLOW_SEND_WITHOUT_TOKENS=true npm start
npm test

# to run an individual test
testcafe chrome:headless tests/new_introduction_test.js
```

### Testcafe Documentation

[https://devexpress.github.io/testcafe/documentation/getting-started/](https://devexpress.github.io/testcafe/documentation/getting-started/)
