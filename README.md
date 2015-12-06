# Website Performance Optimization portfolio project


## Getting Started

Run `npm install` to install all required dependencies.

## Understanding Performance Improvements

### Part 1: Optimize PageSpeed Insights score for index.html

- **Minify everything**

- **Inline all css and js**

Style.css, the Google Font css, and the js code were minified and then inlined at head section. For this site, there's no need to inline in the body section.

- **Compress the pizzeria picture**

### Part 2: Optimize Frames per Second in pizza.html

#### Improvements on the scrolling experience

- **Reduce the number of moving pizzas**

The number of moving pizzas was reduced from 200 to around 20.

- **Replace inefficient methods to access DOM**

`querySelector` and `querySelectorAll` were replaced with `getElementById` or `getElementsByClassName`.

- **Optimize for loops**

All unnecessary code was moved out. For instance, new code was written to generate the six possible locations for moving pizzas, so there's no need to calculate location for each moving pizza.

- **Save layout time with `translateX`**

`translateX` achieves the same result as `left` but triggers only the composite process.

#### Improvements on the resizing pizzas experience

- The loop through all random pizzas now sets the element size by a percentage value calculated outside, and contains no other calculations.

To check out the improvements in the actual code, see all comments beginning with `For performance`.