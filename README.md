<h1>side-slider</h1>

[![NPM version][npm-image]][npm-url] [![npm download][download-image]][download-url] 

[npm-image]: https://img.shields.io/npm/v/@saschati/side-slider.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@saschati/side-slider
[download-image]: https://img.shields.io/npm/dm/@saschati/side-slider.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/@saschati/side-slider

A library for animation of side sliders that is calculated and optimized for this niche.

## Before use:
 - This plugin does not style the tape container and its internal blocks, but only animate them move.
 - If you need a simple slider, it is better to choose another plugin.
 - When switching elements, the slider moves the element to the end or the beginning of the collection of DOM elements, so it works with DOM elements

## Install:
```
npm i @saschati/side-slider
```

## Usage:
```
import SideSlider from "@saschati/side-slider";

// This event is required for the plugin to work correctly
window.addEventListener('load', function () {
   // By default, the placement ribbon is on the right
   const slider = new SideSlider({
        wrapper: document.querySelector('.side-slider'),
    });

    slider.boot();
});
```

## Advanced:
```
import SideSlider from "@saschati/side-slider";
// Animate class
import Animate from "@saschati/src/animate/animate";
import reverse from "@saschati/src/animate/timing/reverse";
// Animations runner
import runnerCaseOut from "@saschati/side-slider/src/animate/animation/runner/cast-out";
import runnerDown from "@saschati/side-slider/src/animate/animation/runner/down";
import runnerFly from "@saschati/side-slider/src/animate/animation/runner/fly";
import runnerHide from "@saschati/side-slider/src/animate/animation/runner/hide";
import runnerLeft from "@saschati/side-slider/src/animate/animation/runner/left";
import runnerRight from "@saschati/side-slider/src/animate/animation/runner/right";
import runnerScale from "@saschati/side-slider/src/animate/animation/runner/scale";
import runnerTornado from "@saschati/side-slider/src/animate/animation/runner/tornado";
import runnerUp from "@saschati/side-slider/src/animate/animation/runner/up";
// Animation next
import nextHide from "@saschati/side-slider/src/animate/animation/next/hide";
import nextRun from "@saschati/side-slider/src/animate/animation/next/run";
import nextScale from "@saschati/side-slider/src/animate/animation/next/scale";
import nextTwist from "@saschati/side-slider/src/animate/animation/next/twist";
// Timing function
import linage from "@saschati/side-slider/src/animate/timing/linage";
// Direction slider
import Left from "@saschati/side-slider/src/chunk/side/left";

window.addEventListener('load', function () {
    const elem = document.querySelector('.side-slider');

    const prev = document.querySelector('.side_prev');
    const next = document.querySelector('.side_next');

    const slider = new SideSlider({
        wrapper: tape,
        // direction: Left,
        options: {
            // Autoplay field
            autoplay: {
                // Determines whether to start autoplay when the plugin is loaded
                active: true,
                // Defines the direction in which autoplay should act by default from the first element to the end
                reverse: false,
                // Determines the speed of change of the element in autoplay
                duration: 3000,
                // Delay for neighboring elements before taking the place of the change element
                delay: 0,
                // Determines whether to count the delay from the user's click option
                calculateDelayFromOther: false,
                // As the elements should shift by default each element separately, the time after the delay is divided between
                chain: true,
                // Option to pause autoplay after last click
                delayedStart: {
                    // Whether to stop forever when one of the buttons was clicked
                    disabled: false,
                    // Timeout for a new autoplay start after the last click
                    delay: 10000,
                },
            },
            // Options for the element that should be hidden and placed at the end/beginning according to the direction
            runner: {
                // A delay for the entire loop so that the animation ends before the parent element changes loop
                wait: 100,
                // Animation of hiding an element
                animates: runnerHide,
            },
            // Options of adjacent elements that make the ribbon move
            next: {
                // The number of visible elements of the tape to divide the time between them if the option chain=true, calculated automatically by default
                visible: null,
                // Optimize the switching process by performing it only when the user sees it
                optimize: true,
                // Animation of displacement of adjacent elements for the movement of the tape
                animates: nextRun,
            },
            // Client click options
            client: {
                // Determines the speed of change of the element in autoplay
                duration: 750,
                // Defines the minimum speed at which autoplay can work
                minDuration: 250,
                // Delay for neighboring elements before taking the place of the change element
                delay: 0,
                // Determines whether to calculate delay from the autoplay option
                calculateDelayFromOther: false,
                // As the elements should shift by default each element separately, the time after the delay is divided between prominent elements
                chain: true,
                // This field determines whether the playback speed will be calculated according to the speed of pressing the buttons
                flexibleClick: true,
                // Indicates that there can be only one animation per click, otherwise clicks will accumulate, and release until the pressure is stopped or the other side of the change is chosen
                prevent: true,
                // Specifies whether to speed up the animation
                speedUp: {
                    // If the value is active, then when you click, the autoplay animation will accelerate to the speed of the click, otherwise, the click will start only after the autoplay animation ends
                    active: true,
                    // Specifies whether, when clicking on the scroll button, autoplay should also perform a click after acceleration is complete otherwise, the first click will simply accelerate the autoplay animation itself to its completion
                    forceNext: true,
                },
                // Ribbon controls object from the client
                button: {
                    // Control button for reverse change
                    prev: prev,
                    // Control button for scrolling
                    next: next,
                },
            },
            // A mutation object that is responsible for customizing an element on pseudo events
            mutation: {
                // Mutation when moving an element to/from the end
                onRun: null,
                // Mutation at the end of the movement of the element to/from the end
                onDone: null,
                // A mutation for an existing active element that is considered the first in the list
                onActive: null,
                // Mutation when the element ceases to be the first and goes to the onRun mutation
                onUnActive: null,
                // Mutation when the element appears in the user's field of view
                onVisible: null,
                // Mutation when the element disappears from the user's field of view
                onUnVisible: null,
                // Mutation when a path was traversed by one element and it switched
                onSwitched: null,

                // Mutation for the control element when pressed and starting the animation
                onClickStart: null,
                // Mutation for a control element when a path has been traversed by one element and it has switched
                onClickFlushed: null,
            },
            // Time function
            timing: linage,
            // Reversible time function
            reverse: reverse,
            // A class for working with animations
            animate: Animate,
        }
    });
    
    // Downloading the configuration and preparing the plug-in to work
    slider.boot();
    // Change the slide change according to the client click settings
    slider.triggerClientClick(true);
    // Start autoplay accordingly
    slider.triggerAutoplay(true);
    // Stop autoplay
    slider.stopAutoplay();
    // Delay autoplay according to autoplay settings
    slider.delayedAutoplay();
});
```

## worth to know:
Before using the plugin, you should know some of its behavior/bugs that may be the reason for not using this library at this time.
Problems will be solved as a way is found, and the author has free time.
If there is a problem in this section, then it has not been solved yet :)
