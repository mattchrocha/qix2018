# QIX
#### [Try it here](https://mattchrocha.github.io/qix2018/)

## About
An adaptation of the 80's arcade games [QIX](https://www.youtube.com/watch?v=Wvzyd0OZg1I) and [Volfield](https://www.youtube.com/watch?v=RxuMVqkLD7o).

Fully developed in **Javascript ES3 canvas**, the player's spaceship has to reduce the stage's area to destroy the enemy.

This project was developed in *Ironhack's Web Development Bootcamp* front-end module by [@mattchrocha](https://github.com/mattchrocha) and was featured as one of the top 3 best projects.

## Features 

The player has two moving states:
- *Protected*, being able to move only through the boundaries of the stage;
- *Unprotected*, being able to freely move around the whole stage in order to creat cut-outs to reduce de stage boundaries.

While unprotected, if the enemy touches the player or the lifeline that connects the player to the stage boundaries, the game is over.

The player wins the game when the stage is reduced below 20%.
