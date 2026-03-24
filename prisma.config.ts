const path = require('path');

module.exports = {
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL,
  },
  migrate: {
    async url() {
      return process.env.DATABASE_URL;
    },
  },
};