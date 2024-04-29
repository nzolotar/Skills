import { BookWithReviews } from "./model";

/**
 * Parses passed books and reviews arrays to create an array of BookWithReviews object. Each row from books input array
 * should have a corresponding row in resulting array. For example, for following input data:
 *    books = [ { "id" : 101, "title" : "Some book title" } ]
 *    reviews = [ { "bookId" : 101, "author" : "John", "content" : "Great book!" } ];
 * It should return following result:
 *    result = [ { id: 101, title: "Some book title", reviews : [ { author: "John", content: "Great book!" }] } ];
 *
 * @param books - an array of input books, see 'src/app/dataset/books.json' for sample data.
 * @param reviews - an array of input reviews, see 'src/app/dataset/reviews.json' for sample data.
 * @returns {Array} - an array of BookWithReviews objects
 */
export function parseBooksData(books, reviews) {
  // retrieve books with reviews
  const allBooksWithReviews = books.map((book) => {
    //find reviews for the book if any
    const matchingReviews = reviews.filter(
      (review) => review.bookId === book.id
    );
    //create new BookWithReviews object
    let bookWithReview = new BookWithReviews(book.id, book.title);
    //add reviews to book using addReview method
    matchingReviews.forEach((review) => {
      bookWithReview.addReview(review.author, review.content);
    });
    //return book with reviews
    return bookWithReview;
  });
  //return books with reviews list
  return allBooksWithReviews;
}

/**
 * Displays data from passed `books` array. For example, if books argument would have following value:
 *    books = [ { id: 101, title: "Some book title", reviews : [ { author: "John", content: "Great book!" }] } ];
 * then, following structure should be created under the parentNode:
 * <ol>
 *    <li>
 *      <span>Some book title</span>
 *      <ul>
 *        <li>Great book! by John</li>
 *      </ul>
 *    </li>
 * </ol>
 * @param parentNode - parent node for all books
 * @param booksWithReviews - an array of BookWithReviews objects.
 */
export function displayBooksWithReviews(parentNode, booksWithReviews) {
  // Clear the parentNode first
  parentNode.innerHTML = "";

  if (booksWithReviews.length === 0) {
    return; // exit the function if there are no books
  }
  const ol = document.createElement("ol");

  //iterate over booksWithReviews
  booksWithReviews.forEach((bookWithReviews) => {
    const li = document.createElement("li");

    //book title
    const spanTitle = document.createElement("span");
    spanTitle.textContent = bookWithReviews.title;
    li.appendChild(spanTitle);

    if (bookWithReviews.reviews.length > 0) {
      //set reviews
      const ul = document.createElement("ul");
      bookWithReviews.reviews.forEach((review) => {
        //add review content as an item in list
        const reviewElement = document.createElement("li");
        reviewElement.textContent = `${review.content} by ${review.author}`;
        ul.appendChild(reviewElement);
      });
      li.appendChild(ul);
    }

    //append book to list of books
    ol.appendChild(li);
  });

  //append to parentNode
  parentNode.appendChild(ol);
}
