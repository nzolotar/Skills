import { parseBooksData, displayBooksWithReviews } from './app';
import testBooks from './dataset/books.json'
import testReviews from './dataset/reviews.json'

describe('booksReviews', () => {
  it(`parseBookData() should return ${testBooks.length} books`, () => {
    const parsedBooks = parseBooksData(testBooks, testReviews);
    expect(parsedBooks.length).toEqual(testBooks.length);
  });

  it(`displayBooksWithReviews() should display ${testBooks.length} book nodes`, () => {
    // given
    const parentEl = document.createElement('div');

    // when
    displayBooksWithReviews(parentEl, parseBooksData(testBooks, testReviews));
    const bookNodes = parentEl.querySelectorAll("ol > li");

    // then
    expect(bookNodes.length).toEqual(testBooks.length);
  });

  it('displayBooksWithReviews() should not render ul when there are no reviews for book', () => {
    // given
    const parentEl = document.createElement('div');

    // when
    displayBooksWithReviews(parentEl, parseBooksData(testBooks, testReviews));
    const bookNodes = parentEl.querySelectorAll("ol > li");

    // then
    expect(bookNodes[2]).toBeDefined();
    expect(bookNodes[2].querySelectorAll("ul").length).toEqual(0);
  });

  it('displayBooksWithReviews() should not render ol when there are no books', () => {
    // given
    const parentEl = document.createElement('div');

    // when
    displayBooksWithReviews(parentEl, parseBooksData([], []));
    const bookNodes = parentEl.querySelectorAll("ol");

    // then
    expect(bookNodes.length).toEqual(0);
  });

  for (const [bookIdx, book] of testBooks.entries()){
    const reviewsOfTheBook = testReviews.filter(review => review.bookId === book.id);
    
    describe(`BookWithReview object for book ${testBooks[bookIdx].id}`, () => {
      it('should contain correct book data', () => {
        const parsedBooks = parseBooksData(testBooks, testReviews);
        expect(parsedBooks[bookIdx]).toBeDefined();
        expect(parsedBooks[bookIdx].id).toEqual(book.id);
        expect(parsedBooks[bookIdx].title).toEqual(book.title);
      });
      it('should contain correct number of reviews', () => {
        const parsedBooks = parseBooksData(testBooks, testReviews);
        expect(parsedBooks[bookIdx]).toBeDefined();
        expect(parsedBooks[bookIdx].reviews.length).toEqual(reviewsOfTheBook.length);
      })
    });

    describe(`DOM node for book ${testBooks[bookIdx].id}`, () => {
      const parentEl = document.createElement('div');
      displayBooksWithReviews(parentEl, parseBooksData(testBooks, testReviews));
      const bookNodes = parentEl.querySelectorAll("ol > li");

      it('should contain correct title', () => {
        expect(bookNodes[bookIdx]).toBeDefined();
        expect(bookNodes[bookIdx].innerText).toContain(book.title);
      });

      it('should contain correct number of reviews', () => {
        expect(bookNodes[bookIdx]).toBeDefined();
        const reviewsNodes = bookNodes[bookIdx].querySelectorAll("ul > li");
        expect(reviewsNodes.length).toEqual(reviewsOfTheBook.length);
      });

      it('should contain correct review data', () => {
        expect(bookNodes[bookIdx]).toBeDefined();
        const reviewsNodes = bookNodes[bookIdx].querySelectorAll("ul > li");
        for (const [idx, reviewNode] of reviewsNodes.entries()){
          expect(reviewNode).toBeDefined();
          expect(reviewNode.innerText).toContain(`${reviewsOfTheBook[idx].content} by ${reviewsOfTheBook[idx].author}`);
        }
      });
    });
  }

});
