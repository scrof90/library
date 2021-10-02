let library = [];

class Book {
  constructor(title, author, isRead) {
    this.title = title;
    this.author = author;
    this.isRead = isRead;
    this.id = `${title}${author}`;
  }
  changeReadStatus() {
    this.isRead = !this.isRead;
    return this;
  }
}

// "Add book" menu functions

const addBookBtn = document.querySelector('.js-btn-add-book');
addBookBtn.onclick = handleAddBookBtnClick;

function handleAddBookBtnClick(e) {
  const book = createBookFromDOM();
  const bookShelf = document.querySelector('.js-bookshelf');
  if (bookShelf.contains(document.getElementById(book.id))) return;
  library.push(book);
  addBookToBookshelf(book);
}

function createBookFromDOM() {
  const inputTitle = document.querySelector('.js-input-title');
  const inputAuthor = document.querySelector('.js-input-author');
  const checkboxRead = document.querySelector('.js-checkbox-is-read');
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const isRead = checkboxRead.checked;
  const newBook = new Book(title, author, isRead);
  return newBook;
}

/*
  Bookshelf functions
*/

function addBookToBookshelf(book) {
  const bookShelf = document.querySelector('.js-bookshelf');
  const bookCard = createBookCard(book);
  bookShelf.appendChild(bookCard);
}

function createBookCard(book) {
  const bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.id = book.id;

  // Text

  const textContainer = document.createElement('div');
  textContainer.classList.add('book-card-text-container');
  const title = document.createElement('h2');
  title.textContent = book.title;
  textContainer.appendChild(title);
  const by = document.createElement('p');
  by.textContent = 'by';
  textContainer.appendChild(by);
  const author = document.createElement('p');
  author.textContent = book.author;
  textContainer.appendChild(author);

  // Buttons

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('book-card-buttons-container');
  const readBtn = document.createElement('button');
  readBtn.type = 'button';
  readBtn.classList.add('read-button');
  readBtn.onclick = handleReadBtn;
  readBtn.textContent = book.isRead ? 'Read' : 'Not read';
  buttonsContainer.appendChild(readBtn);
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.classList.add('remove-button');
  removeBtn.onclick = handleRemoveBtn;
  removeBtn.textContent = 'Remove';
  buttonsContainer.appendChild(removeBtn);

  // Assembling book card

  bookCard.appendChild(textContainer);
  bookCard.appendChild(buttonsContainer);
  return bookCard;
}

/*
  Book Card buttons functions
*/

function handleReadBtn(e) {
  const bookCard = e.target.parentNode.parentNode;
  const id = bookCard.id;
  const book = library.find((book) => book.id === id);
  book.changeReadStatus();
  const readBtn = e.target;
  readBtn.textContent = book.isRead ? 'Read' : 'Not read';
}

function handleRemoveBtn(e) {
  const id = e.target.parentNode.parentNode.id;
  removeBookCardById(id);
  removeBookFromLibraryById(id);
}

function removeBookCardById(id) {
  const bookCard = document.getElementById(id);
  const bookShelf = document.querySelector('.js-bookshelf');
  bookShelf.removeChild(bookCard);
}

function removeBookFromLibraryById(id) {
  const bookIndex = library.findIndex((book) => book.id === id);
  library.splice(bookIndex, 1);
}

/*
  function populateBookshelf(arr) {
    const bookShelf = document.querySelector('.js-bookshelf');
    bookShelf.innerHTML = '';
    arr.forEach((book) => addBookToBookshelf(book));
  }
*/

/*
  function getRandomID() {
    return Math.random().toString(36).substr(2, 5);
  }
*/

/*
  TODO:
  Optional - we haven’t learned any techniques for actually storing our data
  anywhere, so when the user refreshes the page, all of their books will
  disappear! If you want, you are capable of adding some persistence to this
  library app using the Web Storage API.
*/
