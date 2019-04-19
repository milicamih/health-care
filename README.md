This project was generated with gulp version 4.0.0.

## Getting Started
Install global gulp cli `npm install -g gulp-cli`.

In bash/terminal/command line, cd into your project directory.
Run `npm install` to instal required files and dependencies.

## Development 

Run `gulp watch` to make changes in project
Gulp watch automatically compiles scss in css and applies changes using BrowserSync when you make changes to your source files.

## Production build

Run `gulp build` to build the project. 
Add your source files to the appropriate app subdirectories. Gulp will process and and compile them into dist.

JavaScript files in the app/js directory will be compiled to dist/js. 
Files in the app/css directory will be compiled to dist/css.
Image files placed in the app/assets/images directory will be optimized  and compiled into dist/svg.
Other files and folders placed in app directory will be copied as-is into the dist directory.