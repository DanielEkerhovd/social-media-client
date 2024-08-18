[![Automated E2E Testing](https://github.com/DanielEkerhovd/social-media-client/actions/workflows/e2e-testing.yml/badge.svg)](https://github.com/DanielEkerhovd/social-media-client/actions/workflows/e2e-testing.yml)
[![Automated Unit Testing](https://github.com/DanielEkerhovd/social-media-client/actions/workflows/unit-testing.yml/badge.svg)](https://github.com/DanielEkerhovd/social-media-client/actions/workflows/unit-testing.yml)

### Workflow Course Assignment

A project about testing using different tools: 
- Prettier
- ESlint
- Husky
- Jest (unit testing)
- Cypress (E2E testing)
- Git Actions

## How to install

1. Clone the workflow branch
2. Install in terminal (requires npm)
```bash
npm install
```
3. Run build
```bash
npm build
```

## How to test

```bash
npm run test
```

To run test individually, use: 

E2E
```bash
npm run test:E2E
```

Unit test
```bash
npm run test:unit
```

## Automatic testing

When you create a pull request, the github actions run and tests both Unit and E2E automaticly

