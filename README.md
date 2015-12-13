# Website Performance Optimization portfolio project


## Getting Started

**Dependencies:** node and npm.

Run `npm install` to install all required node-modules.

Run `gulp serve` to open both the local site and the ngrok-hosted site in your browser.

Run `gulp psi` to perform PageSpeed test for index.html and see results in the terminal.

## Understanding Performance Improvements

### Part 1: Optimize PageSpeed Insights score for index.html

- **Minify everything and compress all pictures with gulp tasks**

- **Inline all css and js**

Style.css, the Google Font css, and the js code were minified and then inlined at the head section. For this site, there's no need to inline css or js in the body section.

### Part 2: Optimize Frames per Second for pizza.html

- **Reduce the number of moving pizzas from 200 to around 20**

- **Replace inefficient methods to access the DOM**

All `querySelector` and `querySelectorAll` were replaced with `getElementById` or `getElementsByClassName`.

- **Optimize for loops**

All unnecessary code was moved outside of the loops. For instance, new code was written to generate the six possible locations for all moving pizzas, so there's no need to compute location for each moving pizza in the loop.

- **Save layout time with `translateX`**

`translateX` achieves the same result as `left` but triggers only the composite process.

- **Improvements on the resizing pizzas function**

The loop now sets the element size by a percentage value computed outside, and all other functions were moved out.

To check out the improvements in the actual views/js/main.js code, look for all comments beginning with `For performance`.