const addBookBtn = document.querySelector('.js-btn-add-book');
addBookBtn.onclick = addBookToLibrary;

let library = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.read = read;
  }
  setID() {
    this.id = library.indexOf(this);
    return this;
  }
  getHTMLTemplate() {
    return `<p>${this.title}<p>
    <p>by<p>
    <p>${this.author}<p>
    <p>${this.read ? 'read' : 'not read'}<p>`;
  }
}

function addBookToLibrary(e) {
  const inputTitle = document.querySelector('.js-input-title');
  const inputAuthor = document.querySelector('.js-input-author');
  const checkboxRead = document.querySelector('.js-checkbox-read');
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const read = checkboxRead.checked;
  const newBook = new Book(title, author, read);
  library.push(newBook);
  newBook.setID();
  updateBookshelf();
}

function updateBookshelf() {
  clearBookshelf();
  library.forEach((book) => {
    const bookShelf = document.querySelector('.js-bookshelf');
    const bookCard = createBookCard(book);
    bookShelf.appendChild(bookCard);
  });
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.innerHTML = book.getHTMLTemplate();
  return bookCard;
}

function clearBookshelf() {
  const bookShelf = document.querySelector('.js-bookshelf');
  bookShelf.innerHTML = '';
}
