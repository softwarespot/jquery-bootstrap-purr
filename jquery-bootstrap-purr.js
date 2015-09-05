/*
 * jQuery-Bootstrap-Purr
 * https://github.com/softwarespot/jquery-bootstrap-purr
 * Author: softwarespot
 * Licensed under the MIT license
 * Version: 1.0.0
 */
; // jshint ignore:line
(function ($, undefined) {

    // Plugin Logic

    $.bootstrapPurr = function (message, options) {
        // Set our options from the defaults, overriding with the
        // parameter we pass into this function
        options = $.extend({}, $.bootstrapPurr.options, options);

        // Create a temporary div element
        var $alert = $('<div/>')
            // Add the 'alert' and 'bootstrap-purr' classes for distinguishing
            // other Bootstrap alerts
            .addClass('alert bootstrap-purr')
            .attr('role', 'alert');

        // If the 'type' is set, then add the relevant alert-* class name
        if (isString(options.type) && /^DANGER|INFO|SUCCESS|WARNING$/i.test(options.type)) {
            $alert.addClass('alert-' + options.type.toLowerCase());
        }

        // Set the default value of 'allow_dismiss' if not a boolean datatype
        options.allow_dismiss = isBoolean(options.allow_dismiss) ? options.allow_dismiss : true;

        // Set the default value of 'allow_dismiss_type' if not defined
        options.allow_dismiss_type = isString(options.allow_dismiss_type) && /^CLICK|HOVER$/i.test(options.allow_dismiss_type) ?
            options.allow_dismiss_type.toUpperCase() :
            'CLICK';

        var isClick = options.allow_dismiss_type === 'CLICK';
        var isHover = options.allow_dismiss_type === 'HOVER';

        // If 'allow dismissal' is set to true, then add the relevant class and append a button element
        if (options.allow_dismiss && isClick) {
            // Close button
            var $button = $('<button/>')
                .attr('type', 'button')
                .addClass('close')
                .attr('data-dismiss', 'alert')
                .attr('aria-label', 'Close');

            // The small 'x' in the top right hand corner
            var $cross = $('<span/>')
                .attr('aria-hidden', 'true')
                .html('&times;');

            // Append the cross to the button element
            $button.append($cross);

            // Append the close button to the alert and add the class
            // that specifies it's dimissible
            $alert.append($button)
                .addClass('alert-dismissible');
        }

        // Append the message to the alert. This could be HTML or simple a TEXT node
        if (message) {
            $alert.append(message);
        }

        // Check if the options.offset is correctly formatted
        options.offset.amount = $.isNumeric(options.offset.amount) ? options.offset.amount : 20;
        options.offset.from = /^TOP|BOTTOM$/i.test(options.offset.from) ? options.offset.from.toLowerCase() : 'top';

        // If 'stack spacing' is not numeric, then set the default to 10
        if (!$.isNumeric(options.stackup_spacing)) {
            options.stackup_spacing = 10;
        }

        // Store the offset amount for use outside the forEach()
        var offsetTotal = options.offset.amount;

        // For each element with the class name of '.bootstrap-purr', calculate the total offset
        $('.bootstrap-purr').each(function () {
            // Cache the jQuery selector
            var $this = $(this);
            offsetTotal = Math.max(offsetTotal, parseInt($this.css(options.offset.from)) + $this.outerHeight() + options.stackup_spacing);
        });

        // Set the default 'element' to 'body', if it's an invalid string
        if (!isString(options.element)) {
            options.element = 'body';
        }

        // Create a css object literal
        var css = {
            display: 'none',
            margin: 0,
            position: (options.element === 'body' ? 'fixed' : 'absolute'),
            width: 'auto',
            'z-index': '9999'
        };

        // Set the css property i.e. top or bottom, with the offset total
        css[options.offset.from] = offsetTotal + 'px';

        // Convert to lowercase
        options.width = ('' + options.width).toLowerCase();

        if (options.width !== 'auto' && $.isNumeric(options.width)) {
            css.width = options.width + 'px';
        }

        // Apply the css styles from above
        $alert.css(css);

        // Get the parent jQuery selector
        var $parent = $(options.element);

        // If the jQuery selector is empty, then default to 'body'
        if ($parent.length === 0) {
            $parent = $('body');
        }

        // Append the alert to the parent element
        $parent.append($alert);

        // Convert to uppercase for case-insensitive matching
        if (isString(options.align)) {
            options.align = options.align.toUpperCase();
        }

        // Apply the css styles with regards to alignment in the parent element
        switch (options.align) {
            case 'CENTER':
                $alert.css({
                    'left': '50%',
                    'margin-left': '-' + ($alert.outerWidth() / 2) + 'px'
                });
                break;

            case 'LEFT':
                $alert.css('left', '20px');
                break;

            default:
                $alert.css('right', '20px');
        }

        // Set the default value of 'draggable' if not a boolean datatype
        options.draggable = isBoolean(options.draggable) ? options.draggable : true;

        // Create variables to store anonymous functions
        var mouseDown = null;
        var mouseMove = null;

        // If 'draggable' is set to true
        if (options.draggable && !isHover) {
            // Add a moving cursor to signify the alert can be moved
            $alert.css('cursor', 'move');

            // Object to store the mouse co-ordinates
            var mouse = {
                x: 0,
                y: 0,
                // Update function
                update: function (event) {
                    this.x = event.pageX;
                    this.y = event.pageY;
                }
            };

            // Create a function expression to reference at a later stage
            mouseDown = function (event) {
                event.preventDefault();

                // If not absolute, fixed or relative, then set the position to relative by default
                if (!/^(ABSOLUTE|FIXED|RELATIVE)$/i.test($alert.css('position'))) {
                    $alert.css('position', 'relative');
                }

                // Update the mouse coordinates
                mouse.update(event);

                // Create a function expression to reference at a later stage
                mouseMove = function (event) {
                    event.preventDefault();

                    // Get the offset object relative to the document
                    var offset = $alert.offset();

                    // Set the offset of the alert element
                    $alert.offset({
                        left: (offset.left + (event.pageX - mouse.x)),
                        top: (offset.top + (event.pageY - mouse.y))
                    });

                    // Update the mouse coordinates
                    mouse.update(event);
                };

                // Register an event for 'MOUSE_MOVE' on the parent element
                $parent.on(Events.MOUSE_MOVE, mouseMove);

                // Tidy up registered events (good housekeeping)

                // Register an event for 'MOUSE_UP' on the parent element
                $parent.one(Events.MOUSE_UP, function () {
                    // 'MOUSE_UP' will automatically be unregistered, due to using .one()

                    // Unregister the 'MOUSE_MOVE' event on the parent element
                    $parent.off(Events.MOUSE_MOVE, mouseMove);
                });
            };

            // Register an event for 'MOUSE_DOWN' on the alert element
            $alert.on(Events.MOUSE_DOWN, mouseDown);
        }

        // Create variable to store anonymous functions
        var mouseHover = null;
        var mouseLeave = null;

        // Create a function expression to reference at a later stage
        // This close the alert
        var alertClose = function () {
            $alert.alert('close');
        };

        // Create a function expression to reference at a later stage
        // Unregister events
        var unregisterEvents = function () {
            // Tidy up registered events (good housekeeping)
            if (options.draggable && !isHover) {
                // Tidy up registered events (good housekeeping)

                // Unregister the 'MOUSE_MOVE' event applied to the parent element
                $parent.off(Events.MOUSE_MOVE, mouseMove);

                // Unregister the 'MOUSE_DOWN' event applied to the alert element
                $alert.off(Events.MOUSE_DOWN, mouseDown);
            }

            // Unregister the 'MOUSE_HOVER' event applied to the alert element
            $alert.off(Events.MOUSE_HOVER, mouseHover);

            // Unregister the 'MOUSE_LEAVE' event applied to the alert element
            $alert.off(Events.MOUSE_LEAVE, mouseLeave);
        };

        // Add the complete function to the 'animate hide' options
        $.extend(options.animate_hide, {
            complete: alertClose
        });

        // Set the default value of 'delay' if not a number datatype or greater than zero
        options.delay = $.isNumeric(options.delay) && options.delay >= 0 ? options.delay : 5000;

        // Set the default value of 'draggable' if not a boolean datatype
        options.delay_pause = isBoolean(options.delay_pause) ? options.delay_pause : false;

        // Store if to dismiss the alert on hover
        var isDismissOnHover = options.allow_dismiss && isHover;

        // Store if to pause the dismissal on hover
        var isPauseOnHover = options.delay > 0 && options.delay_pause;

        // Store whether or not the pause alert has taken place or the timeout has been cancelled
        var isPaused = false;
        var hasTimedout = false;

        // If 'allow_dismiss' is true and the type is 'hover' OR
        // if delay on hover, then register the 'MOUSE_HOVER' event
        if (isDismissOnHover || isPauseOnHover) {
            // Create a function expression to reference at a later stage
            mouseHover = function () {
                if (isDismissOnHover) {
                    $alert.animate(options.animate_hide, options.animate_hide);
                } else if (isPauseOnHover) {
                    isPaused = true;

                    // Register a 'MOUSE_LEAVE' event only once
                    $alert.one(Events.MOUSE_LEAVE, function () {
                        isPaused = false;
                        if (hasTimedout) {
                            $alert.animate(options.animate_hide, options.animate_hide);
                        }
                    });
                }
            };

            // When the alert is hovered over. Register the 'MOUSE_HOVER' event
            $alert.on(Events.MOUSE_HOVER, mouseHover);
        }

        // When the alert is closed, unregister registered events
        $alert.one(Events.ALERT_CLOSED, unregisterEvents);

        // Display the alert
        $alert.animate(options.animate_show);

        // Create a delay on fade out if greater than zero,
        // otherwise the alert will stay there indefinitely
        if (options.delay > 0) {
            setTimeout(function () {
                hasTimedout = true;
                if (!isPaused) {
                    $alert.animate(options.animate_hide, options.animate_hide);
                }
            }, options.delay);
        }

        // Return the alert selector
        return $alert;
    };

    // Constants

    var Events = {
        // Fired by Bootstrap when the alert has finally closed
        ALERT_CLOSED: 'closed.bs.alert',

        // When the primary mouse button is pushed down on the alert
        MOUSE_DOWN: 'mousedown.bootstrap.purr',

        // When the mouse starts hovering over the alert
        MOUSE_HOVER: 'mouseenter.bootstrap.purr',

        // When the mouse stops hovering over the alert
        MOUSE_LEAVE: 'mouseleave.boostrap.purr',

        // When the mouse is moved whilst the primary mouse button is down. This is only created when 'MOUSE_DOWN' is invoked
        MOUSE_MOVE: 'mousemove.bootstrap.purr',

        // When the primary mouse button is released. This is only called once using .one()
        MOUSE_UP: 'mouseup.bootstrap.purr'
    };

    // Fields

    // Methods (Private)

    // Check if value is a boolean datatype
    function isBoolean(value) {
        return $.type(value) === 'boolean';
    }

    // Check if a value is a string datatype with a length greater than zero when whitespace is stripped
    function isString(value) {
        return $.type(value) === 'string' && value.trim().length > 0;
    }

    // Defaults

    $.bootstrapPurr.options = {
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

        // Type of dismissal when 'allow_dismiss' is set to true. If the type is 'hover' and 'draggable' is set to true,
        // then 'draggable' will be ignored
        allow_dismiss_type: 'click', // ('click', 'hover')

        // Options to pass to the .animate() function when displaying the an alert
        animate_show: {
            opacity: 'show', // See the animate() function in jQuery for more details
            duration: 'fast'
        },

        // Options to pass to the .animate() function when closing the an alert
        animate_hide: {
            opacity: 'hide', // See the animate() function in jQuery for more details
            duration: 'slow'
        },

        // Delay for 'on fade out' in milliseconds
        delay: 5000, // (number)

        // Pause the delay when hovering over the alert
        delay_pause: false, // (true, false)

        // Whether the alert should be draggable using the primary mouse button
        draggable: true, // (true, false)

        // Spacing between each new alert that is created
        stackup_spacing: 10 // (number)
    };
})(jQuery);
