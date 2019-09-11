# README

pollsandsurverys is a open source web application, where a user create his own or answer to an existing one

Currently the app runs with
* Ruby version - 2.5.3
* Rails version - 5.2.3
* React - 16

# Unit Testing

Rails - Minitest

Command - rake db:test

React - Jest and Enzyme

Command - jest

Database - PostgreSQL

# Dev Setup

After cloning the app usual steps should do the job, `bundle;rails db:setup;yarn`.

Used foreman to start up both webpacker dev server and rails server, running `foreman start` should kick both.

# Other Details:

Tried to avoid third party libraries as much as possible.

Webpacker for compiling and yarn for managing assets.
Uses axios for making requests.
Uses redux for managing state in react.
