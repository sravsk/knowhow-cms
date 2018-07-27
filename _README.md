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

> Create a config.js file in the root directory

Create a local MySQL database and add the following code in the file.

module.exports = {
  DBNAME: 'your-database-name',
  DBUSERNAME: 'your-username',
  DBPASSWORD: 'your-password',
  DBHOST: 'localhost'
};

or

Create a DB instance on Amazon RDS and add the following code in the file.

module.exports = {
  DBNAME: 'database-name',
  DBUSERNAME: 'username',
  DBPASSWORD: 'password',
  DBHOST: 'amazonrdsdb-hostname',
  DBPORT: 'rds-instance-port-number'
};

Create a .conf file for elastic search.

input {
    jdbc {
        jdbc_connection_string => "jdbc:mysql://localhost:5432/mydb"
        jdbc_user => "mysql"
        jdbc_validate_connection => true
        jdbc_driver_library => "/path/to/mysql-9.4-1201.jdbc41.jar"
        jdbc_driver_class => "org.mysql.Driver"
        statement => "SELECT * from contacts"
    }
}
output

## Requirements

Node
MySQL
React
Sequelize
Express

## Development

### Installing Dependencies

From within the root directory:

npm install

### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](_CONTRIBUTING.md) for contribution guidelines.
