const { defineConfig } = require('cypress');
const dotenv = require('cypress-dotenv');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Load .env variables into Cypress environment
      config = dotenv(config);

      // You can add other event listeners here if needed

      // Return the modified config
      return config;
    }
  },
});
