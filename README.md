# Project Name

> Know-how: A knowledge base app.

## Team

  - __Product Owner__: Amena Kauser Syeda
  - __Scrum Master__: Sravanthi Karanam
  - __Development Team Members__: Adelle Housker, Ted Green, Sravanthi Karanam, Amena Kauser Syeda

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

> Create a config.js file in the root directory.

> Create a DB instance on Amazon RDS (or create a local MySQL database).

> Go to sendgrid.com, sign up for an account and generate an API key.

> Create an Elasticsearch domain on AWS, configure a cluster and set up access.

Add the following code in the config.js file.

module.exports = {
  DBNAME: 'database-name',
  DBUSERNAME: 'db-username',
  DBPASSWORD: 'db-password',
  DBHOST: 'amazonrds-db-hostname or localhost',
  DBPORT: 'port-number(3306)',
  SENDGRID_API_KEY: 'sendgrid-api-key',
  ES: {
    url: 'AWS-ES-endpoint',
    region: 'region',
    accessKeyId: 'access-key',
    secretAccessKey: 'secret-access-key'
  }
};

> To use a local elasticsearch cluster, download Elasticsearch. Run bin/elasticsearch.

## Requirements

> Node
> MySQL
> React
> Sequelize
> Express

## Development

### Installing Dependencies

From within the root directory:

npm install

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)

## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
