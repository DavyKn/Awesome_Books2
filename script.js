const bookForm = document.querySelector('.book-form');

const bookContainer = document.querySelector('.book-container');

const books = JSON.parse(localStorage.getItem('books')) || [];

// eslint-disable-next-line no-undef
uniqueIdGen = () => {
  let id = Date.now();
  // eslint-disable-next-line no-return-assign
  return () => id += 1;
};
// eslint-disable-next-line no-undef
uniqueId = uniqueIdGen();
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    // eslint-disable-next-line no-undef
    this.id = uniqueId();
  }

  static addBook = (book) => {
    const x = {
      title: book.title,
      author: book.author,
      id: book.id,
    };
    books.push(x);
    localStorage.setItem('books', JSON.stringify(books));
    return x;
  };

  static createBook = ({
    title, author, id,
  }) => {
    const bookDiv = document.createElement('div');
    bookDiv.setAttribute('data-id', id);
    bookDiv.classList.add('book');
    const bookTitle = document.createElement('h2');
    const bookAuthor = document.createElement('p');
    const AremoveBtn = document.createElement('button');
    AremoveBtn.classList.add('remove');
    const Ahr = document.createElement('hr');

    bookTitle.innerText = `${title}`;
    bookAuthor.innerText = `${author}`;
    AremoveBtn.innerText = 'Remove';

    bookDiv.append(bookTitle, bookAuthor, AremoveBtn, Ahr);
    bookContainer.appendChild(bookDiv);

    AremoveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const index = books.findIndex((book) => book.id === id);
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
      localStorage.removeItem('bookDiv');
      bookDiv.remove();
    });
  };
}
books.forEach(Book.createBook);
bookForm.onsubmit = (e) => {
  e.preventDefault();
  const newBook = Book.addBook(new Book(bookForm.title.value, bookForm.author.value));
  Book.createBook(newBook);
};
