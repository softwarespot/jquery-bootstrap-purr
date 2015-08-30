# jQuery-Bootstrap-Purr - v1.0.0

![jquery-boostrap-purr](https://cloud.githubusercontent.com/assets/5333690/9566952/b2d752fc-4f22-11e5-9e37-aeb7332352c4.png)

A jQuery plugin for displaying `Bootstrap Alerts` dynamically on a website.

## What exactly is jQuery-Boostrap-Purr?

How many times have you written the following code to display an alert on the page? Quite a lot I should probably imagine. Surely there must be a better approach with using one line of JavaScript? Of course there is and it's called jQuery-Bootstrap-Purr.

```html
    <!--START: Success alert markup-->
    <div id="success-alert" class="alert alert-success alert-dismissible fade in" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            <span class="sr-only">Close</span>
        </button>
        This is a simple "purr" which is draggable with the primary mouse
    </div>
    <!--END: Success alert markup-->
```

```javascript
    // Display the dismissible alert with id of '#success-alert'
    var $alert = $('#success-alert').alert();
```

## This is where jQuery-Bootstrap-Purr really comes into a world of its own, as you can display a message with one single line and it does all the rest for you. Now it might not make your pages look overly 'swanky', but it sure would try if it could!

```javascript
    <!--Use the minified version for better performance-->
    <script src="jquery-bootstrap-purr.min.js"></script>

    <script>
        // Display an alert
        $.bootstrapPurr('This is a simple "purr" that is draggable with the mouse. Drag me!');
    </script>
```

## How to install

If you use bower, then just copy and paste the following command to the shell window.
```shell
    bower install jquery-bootstrap-purr
```

Otherwise just include `jquery-bootstrap-purr.min.js` somewhere in your document, preferable after jQuery and Bootstrap (since it relies on both).

### Requirements

The plugin assumes that the following libraries have been included beforehand.
- jQuery 2.0.*
- Bootstrap 3.*

## Documentation

jQuery-Bootstrap-Purr has two parameters only, the message to display and optional options. Please see below for the available options.

```javascript
    $.bootstrapPurr(messgae, options [optional]);
```

### Options

The following options below can either be passed via the `options` parameter or by overriding the defaults using `$.bootstrapPurr.options.[PROPERTY]`, in which the property is substituted for a particular option.

```javascript
    {
        // Default parent element to append the alert to
        element: 'body',

        // Type of alert. See Bootstrap documentation for any additional supported formats
        type: 'info', // (null|'default', 'info', 'danger', 'success')

        // Alert offset
        offset: {
            amount: 20, // (number)
            from: 'top' // ('top', 'bottom')
        },

        // Alignment relative to the parent element
        align: 'right', // ('left', 'right', 'center')

        // With of the alert. The default is 250px, which is the same as Bootstrap's alerts
        width: 250, // (number, 'auto')

        // If true then a cross will be displayed in the top right hand corner of the alert
        allow_dismiss: true, // (true, false)

        // Delay for 'on fade out' in milliseconds
        delay: 5000, // (number)

        // Whether the alert should be draggable using the primary mouse button
        draggable: true, // (true, false)

        // Spacing between each new alert that is created
        stackup_spacing: 10 // (number)
    }
```

## Contribute

To contribute to the project, you will first need to install [gulp](gulpjs.com) globally on your system. Once complete change the working directory to the plugin and run the following command:

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

##### Build
Call the following command to invoke both JSHint and Uglify.
```shell
    gulp
```

### Thanks

The following jQuery plugin started out as a `fork` of [bootstrapGrowl](https://github.com/ifightcrime/bootstrap-growl/), but over time it became clear the direction 'Purr' was going in, was outside the scope of 'Growl'. Therefore a special thanks to the contributors of [bootstrapGrowl](https://github.com/ifightcrime/bootstrap-growl/), in which this plugin was based on.
