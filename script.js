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
    const paragraphDiv = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    paragraphDiv.append(bookTitle, bookAuthor);
    paragraphDiv.classList.add('para');
    const AremoveBtn = document.createElement('button');
    AremoveBtn.classList.add('remove');

    bookTitle.innerText = `"${title}" by`;
    bookAuthor.innerText = ` ${author}`;
    AremoveBtn.innerText = 'Remove';

    bookDiv.append(paragraphDiv, AremoveBtn);
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

const addNewAuthorLink = document.querySelector('.form-link');
const listLink = document.querySelector('.list-link');
const contactLink = document.querySelector('.contact-link');
const addNewAuthor = document.getElementById('form');
const list = document.getElementById('list');
const contact = document.getElementById('contact');

const date = new Date();
const time = date.toUTCString();
// eslint-disable-next-line no-unused-vars ,no-multi-assign
const dateItem = document.querySelector('.date').innerHTML = time;

listLink.addEventListener('click', () => {
  addNewAuthor.style.display = 'none';
  contact.style.display = 'none';
  list.style.display = 'block';
});

addNewAuthorLink.addEventListener('click', () => {
  list.style.display = 'none';
  contact.style.display = 'none';
  addNewAuthor.style.display = 'block';
});

contactLink.addEventListener('click', () => {
  list.style.display = 'none';
  addNewAuthor.style.display = 'none';
  contact.style.display = 'flex';
});