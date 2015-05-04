####Website Performance Optimization portfolio project - Annette Harper

Udacity project related to optimizing web sites.

##Overview

The assignment was to optimize the PageSpeed Insights score for index.html above 90, to optimize frames per second in views/pizza.html above 60, and to reduce the time to resize pizzas to under 5ms.

To inspect optimization modifications that were done, you can fork the git repo or download it, and look at the files in the project directory. Comments explain the changes that were made. Alternatively, comparisons to the original forked version could be done to see what changed.

To validate the performance of the main portfolio site or the child pizza site, PageSpeed Insights and FPS in the Chrome dev tools console can be used. However, note the following!  

************************************************************
For testing, please use the index.html and associated files in the frontend-nanodegree-mobile-portfolio/dist directory. Those have been minimized, etc.
************************************************************

###Assignment related Information

##Comments
  My code comments are prefixed with //--- in the code files themselves to differentiate from comments that existed before I forked the project.

####Part 1: Optimize PageSpeed Insights score for index.html

I completed all the PageSpeed Insights recommendations except for "Leverage browser caching" and "Enable compression." The python server didn't seem to know to unzip, gzipped files. I may have been able to figure out how to change the server settings to get both of these suggestions implemented, but was already at 95, so didn't explore further.

I also did not load the custom font. I tried several methods of loading the font, but none resulted in an improvement. I thought the default san serif font was close enough anyway.

(I did not personalize the site, as my time is limited.)

####Part 2: Optimize Frames per Second in pizza.html

For general optimization of the pizza site, I did the following:
    1. In-lined the style.css file.
    2. Minimized the bootstrap file.
    3. Minimized the main.js file.

For optimizing the pizza re-sizing, I made changes as commented in the resizePizzas function.

For optimizing the moving pizzas, I did the following in the main.js file:
    1. In the DOMContentLoaded function, I computed the maximum possible number of pizzas that could show up on someone's screen and created only that many (plus enough more to get to a multiple of 5). A more dynamic method would need to check for window resizing and add or remove pizzas then. All pizzas were created in code and then appended as a group to the document. This also required the removal of the creation of the movingPizzas1 div from the pizza.html file. I also resized the pizza.png image to the size required.
    2. In the updatePositions function, I moved all possible computations out of the for loop and made the loop increment by 5s.
    3. Also in updatePositions, I use transform/translateX instead of setting the left style explicitly.

My average time to generate last 10 frames is consistentely under .4 ms, which should translate to greater than 60fps, however, when I record a timeline, I am still seeing some instances of less than 60fps. The javascript times are very low with the overages being mainly due to painting. I'm not sure if my computer is painting slow for some reason, or if the fact that I have a very large monitor is contributing, but of course there are painting optimizations that might help as well. If I emulate a phone screen or notebook, the fps is very good.
