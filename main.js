let library = [];

// TODO: Айдишник привязывать к номеру в массиве плохо
// Лучше генерировать его глобально

class Book {
  constructor(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
  }
}

const addBookBtn = document.querySelector('.js-btn-add-book');
addBookBtn.onclick = handleAddBookBtnClick;

function handleAddBookBtnClick(e) {
  const book = createBookFromDOM();
  library.push(book);
  addBookToBookshelf(book);
}

function createBookFromDOM() {
  const inputTitle = document.querySelector('.js-input-title');
  const inputAuthor = document.querySelector('.js-input-author');
  const checkboxRead = document.querySelector('.js-checkbox-read');
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const read = checkboxRead.checked;
  const newBook = new Book(title, author, read);
  return newBook;
}

function addBookToBookshelf(book) {
  const bookShelf = document.querySelector('.js-bookshelf');
  const bookCard = createBookCard(book);
  bookShelf.appendChild(bookCard);
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.innerHTML = createHTMLTemplate(book);
  return bookCard;
}

function createHTMLTemplate(book) {
  return `<p>${book.title}<p>
    <p>by<p>
    <p>${book.author}<p>
    <p>${book.read ? 'read' : 'not read'}<p>`;
}

// TODO: Ещё попробуй написать updateBookshelf() без использования clearBookshelf()

function updateBookshelf() {
  const bookShelf = document.querySelector('.js-bookshelf');
  clearBookshelf();
  library.forEach((book) => {
    const bookCard = createBookCard(book);
    bookShelf.appendChild(bookCard);
  });
}

function clearBookshelf() {
  const bookShelf = document.querySelector('.js-bookshelf');
  bookShelf.innerHTML = '';
}
