# JavaScript Book Reviews

## Introduction

This is a simple application that parses JSON data about books and reviews, then displays the reviews associated with each book.

## Problem Statement

You have been given the task to implement two functions in the `src/app/app.js` file.

### `parseBooksData` function

- The `parseBooksData(books, reviews)` function should that create an array of `BookWithReviews` objects, by parsing the two arrays passed in (`books` and `reviews`).
- Sample JSON data for books and reviews are in the `app/dataset/books.json` and `app/dataset/reviews.json` files.
- The `BookWithReviews` class is defined in the `app/model.js` file; a `BookWithReviews` object should contain the `id`, `title` and all reviews matched by `bookId` attribute from `reviews` array.

### `displayBooksWithReviews` function

The `displayBooksWithReviews(parentNode, booksWithReviews)` function should append DOM nodes to the passed `parentNode`, to render the book review information stored in the passed array, which contains a collection of `BookWithReviews` objects.

For the sample book and review data in the `app/dataset` folder, the following DOM tree should be created under the `parentNode`:

```html
  <ol>
    <li>
      <span>Some book title</span>
      <ul>
        <li>Great book! by John</li>
        <li>Worth reading. by Alice</li>
      </ul>
    </li>
    <li>
      <span>Another book title</span>
      <ul>
        <li>Waste of time :( by Joe</li>
      </ul>
    </li>
    <li>
      <span>Best book title ever</span>
    </li>
  </ol>
```

### IMPORTANT

You're not expected to modify any of the existing files, other than `src/app/app.js`; you can add new files if it helps you.


## Setup

Follow these steps if you are using zip/git mode (i.e. not available inside Devskiller in-browser IDE):

1. `npm install` – install dependencies
2. `npm test` – run all tests (this will be used to evaluate your solutions)
3. `npm run test:watch` – run all tests in _watch mode_ (alternative to `npm test` which you might find more convenient to use locally)
4. `nvm install` - (optional) set up the expected _major_ version of Node.js locally ([`nvm`](https://github.com/nvm-sh/nvm) required; Node.js version defined in `.nvmrc` file)

**Good Luck!**
