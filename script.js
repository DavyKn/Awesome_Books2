
const bookForm = document.querySelector('.book-form');
const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const bookContainer = document.querySelector('.book-container');
const addBtn = document.querySelector('.add-btn')

const books = JSON.parse(localStorage.getItem('books')) || [];

uniqueIdGen = () => {
    let id = Date.now();
    // eslint-disable-next-line no-return-assign
    return () => id += 1;
};
uniqueId = uniqueIdGen();
class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }

    static addBook = (title, author) => {
        const id = uniqueId();
        books.push({
            title,
            author,
            id,
        });
        localStorage.setItem('books', JSON.stringify(books));
        return { title, author, id };
    };

    static createBook = ({
        title, author, id,
    }) => {
        const bookDiv = document.createElement('div');
        bookDiv.setAttribute('data-id', id);
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

    // books.forEach(createBook);
}

bookForm.onsubmit = (e) => {
    e.preventDefault();

    const newBook = addBook(
        new Book(title, author)
    );
    createBook(newBook);
    title = ''
    author = ''
};