************************************************************
For testing, please use the index.html and associated files in the frontend-nanodegree-mobile-portfolio/dist directory. Those have been minimized, etc.
************************************************************

Some issues with windows..................
  For Python 3, the command to create an HTTP server is python -m http.server 8080

  To run ngrok from Windows 7, I had to:
    1. Open a command prompt, and enter the Python 3 command above.
    2. Open a second command prompt, and run ngrok 8080.

Grunt
  I used grunt to minify files, optimize images, etc. I should add in processHTML so that I do not need to change the file references in index.html manually, but that will have to wait till next time :)

  Setting up grunt
    1. Open a command prompt, cd to the project folder.
    2. Run npm init
    3. Answer questions...package.json is created.
    4. run npm install grunt --save-dev
    5. run npm install grunt-contrib-jshint --save-dev
    6. run npm install grunt-contrib-nodeunit --save-dev
    7. run npm install grunt-contrib-uglify --save-dev
    8. run npm install grunt-contrib-qunit --save-dev
    9. run npm install grunt-contrib-concat --save-dev
    10. run npm install grunt-contrib-watch --save-dev
    11. run npm install grunt-contrib-imagemin --save-dev
    12. run npm install grunt-contrib-cssmin --save-dev
  // Tried both of the below, but neither helped with the jpeg optimiation problem noted below.
  //  run npm install --save imagemin-mozjpeg
  //  run npm install --save imagemin-jpegoptim
  // I did not actually use compression, either.
  // run npm install grunt-contrib-compress --save-dev
    13. run npm install grunt-contrib-htmlmin --save-dev

    Note that imagemin would not work on the jpeg image, so I compressed it manually and saved to the dist directory.

Comments
  My code comments are prefixed with //--- in the code files themselves to differentiate from other comments.

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