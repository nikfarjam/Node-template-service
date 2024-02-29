# Robot Challenge

This **NodeJS/Typescript** project contains source code and all required resource for a coding challenge simulating a toy robot moving on a square tabletop of dimensions 5 units x 5 units.

# Description:

The challenge involves creating an application that controls a toy robot on a square tabletop. The robot initially starts in an unknown position and can be placed at any valid location on the grid facing any of the four cardinal directions (North, East, South, West).

The robot understands the following commands:

PLACE X,Y,F: Places the robot at a specific position (X,Y) facing a specific direction (F).  
MOVE: Moves the robot one unit forward in the direction it is currently facing.
LEFT: Rotates the robot 90 degrees counter-clockwise.  
RIGHT: Rotates the robot 90 degrees clockwise.  
REPORT: Reports the current position (X,Y) and facing direction (F) of the robot.

# Specifications

This application reads and executes commands from a text file line by line and reports postion of the robot on the console.

- The application exits after reading and executing all commands in the file.
- The application is able to ignore spaces around each command. For example the following commands are valid `MOVE  `, `PLACE   1 , 3, EAST`
- Commands are case insensitive, For eaxmple `move` and `Left` are valid.
- The application is able to ignore commands that do NOT match with (PLACE X,Y,F|MOVE|LEFT|RIGHT|REPORT).
- Lines in the file can be commented out by adding a charachter such as # at the begining of the line.
- Each line can contain only one command

# Prerequisites

The only requirement to run this application is 
[NodeJS and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).


 # Usage

### Testing

This command will run unit tests and generate unit test code coverage report in `./coverage/`.
```bash
npm test
```

To save time, this command run unit tests in watch mode
```bash
npm run test-watch
```

This command runs integration tests and generates code coverage report in `./coverage-integration/`.
```bash
npm run test-integration
```

### Compile the project
This command compiles TypeScript source code to JavaScript 
```bash
npm run compile
```

### Build the application

This project uses webpack to build a single JavaScript file ( `./dist/main.js` )with all required code and dependencies.

```bash
npm run build
```

### Run the application

#### Parmas

This application reads the following **optional** settings from environment variable.  
- **COMMAND_FILE** Full or relative path of a file contains list of the commands for tha applicarion
- **BOARD_SIZE** (Default 5) Dimention of the tabletop

To pass params to the application 
1. Pass by command line
```bash
DEBUG=* COMMAND_FILE=./data/board.txt BOARD_SIZE=5 node ./dist/main.js
```
1. Pass by config file  
Create a text file that contains environment variables, [Example](./config.env)
```bash
node --env-file=config.env ./dist/main.js
```   

#### 1. Run the application in Development mode
It's recommanded to run the application with debug log, by passing this environment variable. 
Edit `./config.env` and modify the following lines.
- **DEBUG=*** Enable debug logs in developent mode
- **COMMAND_FILE** (mandatory) Full or relative path of a file contains list of the commands for tha applicarion

Run the following command
```bash
npm start
```

#### 2. Run the application in Production mode
It's recommanded to run the applicaion with the following settings.

- **DEBUG=None** Disable debug logs in production
- **NODE_ENV=production** Hide error stack trace

```bash
npm run build
node --env-file=config.env ./dist/main.js
# OR
node DEBUG=None ./dist/main.js ./data/board.txt
```
