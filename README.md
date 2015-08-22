# jquery-bootstrap-purr

## Note: This is currently under development, therefore it is recommended you do not use in production environments until v1.0.0 has been reached. Thanks

jQuery Bootstrap Alerts

Deadline for documentation completion and the public API being frozen is 2015/08/23

## Contribute

To contribute to the project, you will first need to install [gulp](gulpjs.com) globally on your system. Once complete change the directory to the plugin and run the following command:

```shell
    npm install
```

Once installation of the local modules has finally completed, you're ready to start contributing to the project. Before you submit your PR, please don't forget to call `gulp`, which will run against [JSHint](jshint.com) for any errors, but will also minify the plugin.

##### Watch
Call the following command to start 'watching' for any changes to the main JavaScript file. This will automatically invoke JSHint and Uglify.
```shell
    gulp watch
```

##### JSHint
Call the following command to invoke JSHint and check that your changes meet the requirements set in .jshintrc.
```shell
    gulp jshint
```

##### Uglify the main file (automatically done whilst watching)
Call the following command to invoke Uglify, which will minify the main JavaScript file and output to a .min.js file.
```shell
    gulp uglify
```

#### Build
Call the following command to invoke both JSHint and Uglify.
```shell
    gulp
```
