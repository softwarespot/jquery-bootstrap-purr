# jQuery-Bootstrap-Purr - v1.1.2

<p align="center"><img src="https://cloud.githubusercontent.com/assets/5333690/9717379/eec41440-557a-11e5-890c-ea9785cd050c.gif"/></p>

A jQuery plugin for displaying `Bootstrap Alerts` dynamically on your website.

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

This is where jQuery-Bootstrap-Purr really comes into a world of its own, as you can display a message with one single line and it does all the rest for you. Now it might not make your pages look overly 'swanky', but it sure would try if it could!

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

Otherwise just include `jquery-bootstrap-purr.min.js` somewhere in your document, preferably after jQuery and Bootstrap (since it relies on these).

### Requirements

The plugin assumes that the following libraries have been included beforehand.
- jQuery 2.0.*
- Bootstrap 3.*

## Documentation

jQuery-Bootstrap-Purr has two parameters. The message to display inside the alert (HTML markup allowed) and/or optional `options`. Please see below for the available options.

```javascript
    $.bootstrapPurr(message, options [optional]);
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
        allowDismiss: true, // (true, false)

        // Type of dismissal when 'allowDismiss' is set to true. If the type is 'hover' and 'draggable' is set to true,
        // then 'draggable' will be ignored
        allowDismissType: 'click', // ('click', 'hover')

        // Options to pass to the .animate() function when displaying the an alert
        animateShow: {
            opacity: 'show', // See the animate() function in jQuery for more details
            duration: 'fast'
        },

        // Options to pass to the .animate() function when closing the an alert
        animateHide: {
            opacity: 'hide', // See the animate() function in jQuery for more details
            duration: 'slow'
        },

        // Delay for 'on fade out' in milliseconds
        delay: 5000, // (number)

        // Pause the delay when hovering over the alert
        delayPause: false, // (true, false)

        // Whether the alert should be draggable using the primary mouse button
        draggable: true, // (true, false)

        // Spacing between each new alert that is created
        stackupSpacing: 10 // (number)
    }
```

## Contribute

To contribute to the project, you will first need to install [node](https://nodejs.org) globally on your system. Once installation has completed, change the working directory to the plugin's location and run the following command:

```shell
    npm install
```

After installation of the local modules, you're ready to start contributing to the project. Before you submit your PR, please don't forget to call `gulp`, which will run against [ESlint](http://eslint.org) for any errors, but will also minify the plugin.

##### Watch
Call the following command to start 'watching' for any changes to the main JavaScript file(s). This will automatically invoke ESLint and Uglify.
```shell
    gulp watch
```

##### ESLint
Call the following command to invoke ESLint and check that the changes meet the requirements set in .eslintrc.
```shell
    gulp eslint
```

##### Uglify
Call the following command to invoke Uglify, which will minify the main JavaScript file(s) and output to a .min.js file respectively.
```shell
    gulp uglify
```

##### Build
Call the following command to invoke both ESLint and Uglify.
```shell
    gulp
```

### Thanks

The following jQuery plugin started life as a `fork` of [bootstrapGrowl](https://github.com/ifightcrime/bootstrap-growl/), but over time it became clear the direction 'Purr' was going in, was outside the scope of 'Growl'. Therefore I would like to extend a special thanks to the contributors of [bootstrapGrowl](https://github.com/ifightcrime/bootstrap-growl/), for making this new plugin possible.
