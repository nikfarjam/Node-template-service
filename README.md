# Robot Challenge

This **NodeJS/Typescript** project contains source code and all required resource for a coding challenge simulating a toy robot moving on a square tabletop of dimensions 5 units x 5 units.

# Description

This application reads commands from a text file and print the result on the console. The application exists after reading and executing all commands in the file. The application is able to ignore spaces around each command and commands that doesn't match with (PLACE X,Y,F|MOVE|LEFT|RIGHT|REPORT). You can add # charachter at the begining of each line to make it comment.

# Prerequisites

[NodeJS and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) is the only requirement to run this application.


 # Usage

### Testing

The following command will run unit tests and generate unit test code coverage report in `./coverage/`.
```bash
npm test
```

To run tests in watch mode
```bash
npm run test-watch
```

This command runs integration tests and generates code coverage report in `./coverage-integration/`.
```bash
npm run test-integration
```

### Compile the project
To compile source code of app and tests
```bash
npm run compile
```

### Build the application


This project uses webpack to build a single JavaScript file `./dist/main.js` with all required code and dependencies.

```bash
mkdir -p dist
npm run build
```

### Run the application

#### Parmas

This application reads the following setting from environment variable.  
- **COMMAND_FILE** (mandatory) Full or relative path of a file contains list of the commands for tha applicarion
- **BOARD_ROWS** (Optional default 5) Number of rows
- **BOARD_COLUMNS** (Optional default 5) Number of columns

To pass params to the application 
1. Pass by command line
```bash
DEBUG=* COMMAND_FILE=./data/board.txt BOARD_ROWS=5 BOARD_COLUMNS=5 node ./dist/main.js
```
2. Pass by config file
Create a text file that contains params, [Example](./config.env)
```bash
node --env-file=config.env ./dist/main.js
```   

#### 1. In Development mode
It's recommanded to run the application with enable debug log, by passing this environment variable.
- **DEBUG=*** Enable debug logs in developent mode
- **COMMAND_FILE** (mandatory) Full or relative path of a file contains list of the commands for tha applicarion

Run the following command
```bash
npm start
```

#### 2. In Production mode
It's recommanded to run the applicaion with the following settings.

- **COMMAND_FILE** (mandatory) Full or relative path of a file contains list of the commands for tha applicarion
- **DEBUG=None** Disable debug logs in production
- **NODE_ENV=production** Hide error stack trace

```bash
mkdir -p dist
npm run build
node --env-file=config.env ./dist/main.js
```
