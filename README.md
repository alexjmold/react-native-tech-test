# Candidate Notes

### Overview

This was a fun little project! I enjoyed coming up with ideas for the UI in terms of design and creating a fun intro animation to mirror the purpose and content of the app. I think this type of project is nice to work with as you can make a very simple version relatively quickly, but it very easily lends itself to feature expansion. I went one step further for the cocktail listing page and implemented a simple search function - this wasn't too much work but I believe it adds a lot to the overall functionality.

### Technical notes

There was a couple of parts with a less than ideal implementation - for example loading a list of random cocktails on initial load. As the free version of the cocktailDB only allowed for a single random cocktail via their endpoints, I had to batch these requests and use Promise.all, which works fine (seen as the responses are so small). However in an ideal world this would be handled with a dedicated endpoint that could handle multiple random cocktails that are unique in the same request.

The other hurdle was displaying the ABV of a cocktail, as this information isn't returned in the cocktail detail response. I did try and alternative method of gathering the cocktail ingredients and running a search for these individual ingredients, returning the ABV (`strABV` in the API response) and performing a calculation based off of the alcoholic ingredients for an estimated ABV. However, unfortunately many of the alcoholic ingredients actually had unpopulated ABV fields which made it extremely difficult to gather this data in a useable way.

One last thing to mention is that I've implemented a fake loading timeout so that the loading states are visible for the purposes of this demo when loading cocktails on either the main cocktail list, or for the search results. There's an infinite scroll (limited to 3 pages) feature for the random cocktails on the home screen and loads almost instantly without this delay!

### Given more time

If I was able to work on this for longer I would have liked to implement a few things as listed below:

- More state animations: A lot of state updates (such as the search functionality) and the UI simply instantly shows the result of that state. I'd like to add some more subtle animations around these UI components so it's not so abrupt.
- Display more information about each drink: I found that the responses from the cocktailDB can sometimes be quite lax in terms of content length. Perhaps implementing data from an external endpoint or even using an LLM response to display more information about the drink and its history would be much more interesting for the user.
- Adding unit/e2e testing: There's a few utility functions which could do with some robust unit tests, as well as adding e2e testing on the screens and shared components.

### Wrap up

If there's any issues when trying to run this project, please reach out to me and I'll be more than happy to help. I should also mention that I've been running this using the iOS simulator using iOS 18.0 as well as testing on my personal iPhone 13 (via the Expo Go app).

I appreciate your time, and hope to hear from you soon!

# Running the project

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npm start
   ```

---

# react-native-tech-test

This test is aimed at software developers with a background in React Native.

## Setup

Please create a fork of this repo and make sure it is public. Click the Fork button in the top right of the repo, as shown in this image.

![Screenshot 2023-06-16 at 15 55 52](https://github.com/asquareduk/react-native-tech-test/assets/17218062/daa4f402-480a-47c5-9a9f-95728238575d)

## Introduction

This challenge will require you to use TypeScript and React Native to build out a couple of screens that display data from an API.

The API we will use for this (because it's free and doesn't require any authentication) is [TheCocktailDB API](https://www.thecocktaildb.com/api.php).

You either use Expo or the React Native CLI, whatever you're most comfortable using, and please use function components/hooks for all of your React components where possible.

Please consider best practices for usability, performance, code quality, and ideally commit often with descriptive commit messages.

## The Challenge

This app will have 2 screens:

- A list screen that displays a list of drinks
- A detail screen that displays details about a specific drink

We don't have any strict design for either of the screens, but try to make them look nice.

The list screen should display a list of drinks, including the drink's image, the name of the drink, and a description (limited to one line, with ellipsis if the description is too long).

You should display only 10 drinks from the API.

Optional bonus point: add some kind of user interface to display more drinks.

Optional bonus point: add a loading state while drinks are loading.

Tapping on one of the drinks in this list should take you to the detail screen for this drink.

The detail screen should display the drink's image, name of the drink, alcohol by volume (abv), tagline, full description, and one other piece of data of your choice.

## Submission

When you are done, commit and push everything to your own repository and send us a link to the resposity via email. If you have problems forking this repo or any issues with getting your submission up on GitHub then please zip up your technical test folder and send it to us via email.
