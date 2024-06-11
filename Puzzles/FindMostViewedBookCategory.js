//TASK: find most viewed category
const Books = [
  { isbn: 1, title: "cat", category: "four legs" },
  { isbn: 2, title: "dog", category: "four legs" },
  { isbn: 3, title: "bird", category: "two legs" },
  { isbn: 4, title: "fish", category: "no legs" },
  { isbn: 5, title: "ants", category: "six legs" },
  { isbn: 6, title: "human", category: "two legs" },
  { isbn: 7, title: "horse", category: "four legs" },
  { isbn: 8, title: "spiders", category: "eight legs" },
  { isbn: 9, title: "catepillar", category: "many legs" },
];
const BooksReviews = [
  { isbn: 1, count: 40 },
  { isbn: 2, count: 30 },
  { isbn: 3, count: 50 },
  { isbn: 4, count: 100 },
  { isbn: 5, count: 90 },
  { isbn: 6, count: 110 },
  { isbn: 7, count: 20 },
  { isbn: 8, count: 15 },
  { isbn: 9, count: 80 },
];

const process = (books, reviews, limit) => {
  // Create a map to store the total view count for each category
  let categoryCount = new Map();

  // Iterate over the books
  books.forEach((book) => {
    // Find the corresponding review
    const review = reviews.find((review) => review.isbn === book.isbn);
    if (!categoryCount.has(book.category)) {
      categoryCount.set(book.category, 0);
    }
    categoryCount.set(
      book.category,
      categoryCount.get(book.category) + review.count
    );
  });

  // Convert the map into an array of [category, views] and sort it by views in descending order
  let mostViewedCategory = Array.from(categoryCount.entries()).sort(
    (a, b) => b[1] - a[1]
  );

  // Return the top N categories
  return mostViewedCategory.slice(0, limit);
};

const process2 = (books, reviews, limit) => {
  const topWithCount = (limit) =>
    reviews
      .filter((e) => books.map((y) => y.isbn).includes(e.isbn)) //intersect
      .slice() //shallow copy
      .sort((a, b) => b.count - a.count) //sorting in desending order
      .slice(0, limit) // cut how many top limit
      .map(({ isbn }) => books.find((book) => book.isbn === isbn).category)
      .join(",");

  return topWithCount(limit);
};
console.log("TOP 1", process(Books, BooksReviews, 1));
console.log("TOP 2", process(Books, BooksReviews, 2));
console.log("TOP 3", process(Books, BooksReviews, 3));

console.log("TOP 1", process2(Books, BooksReviews, 1));
console.log("TOP 2", process2(Books, BooksReviews, 2));
console.log("TOP 3", process2(Books, BooksReviews, 3));
