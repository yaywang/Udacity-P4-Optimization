## Website Performance Optimization portfolio project


## Getting Started
run: `npm install`
This will install all required dependencies

## Understanding Performance Improvements

### Part 1: Optimize PageSpeed Insights score for index.html



### Part 2: Optimize Frames per Second in pizza.html
#### Improvements on the scrolling experience
**Reduce the number of moving pizzas**
The number of moving pizzas was reduced from 200 to around 20.
**Replace inefficient DOM access methods**
`querySelector` and `querySelectorAll` were replaced with `getElementById` or `getElementsByClassName`.
**Optimize for loops**
All unnecessary code was moved out. For instance, new code was written to generate the six possible locations for moving pizzas, so there's no need to calculate location for each moving pizzas.
**Save layout time with `translateX`**
 `translateX` achieves the same as `left` but triggers only the composite process.

#### Improvements on the resizing pizzas experience
The loop to resize all random pizzas now sets the element size by a percentage value calculated outside, and contains no other calculations.

To check out the improvements in the actual code, see all comments beginning with `For performance`.