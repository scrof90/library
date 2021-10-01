let library = [];

class Book {
  constructor(title, author, read) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.id = `${title}${author}`;
  }
  changeStatus() {
    this.read = !this.read;
    return this;
  }
}

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
  bookCard.id = book.id;
  const title = document.createElement('h2');
  title.textContent = book.title;
  const by = document.createElement('p');
  by.textContent = 'by';
  const author = document.createElement('p');
  author.textContent = book.author;
  const read = document.createElement('p');
  read.id = `read${book.id}`;
  read.textContent = book.read ? 'Read' : 'Not read';
  const readBtn = document.createElement('button');
  readBtn.type = 'button';
  readBtn.onclick = handleReadBtn;
  readBtn.textContent = 'Read';
  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.onclick = handleRemoveBtn;
  removeBtn.textContent = 'Remove';
  bookCard.appendChild(title);
  bookCard.appendChild(by);
  bookCard.appendChild(author);
  bookCard.appendChild(read);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);
  return bookCard;
}

function handleReadBtn(e) {
  const bookCard = e.target.parentNode;
  const bookID = bookCard.id;
  const book = library.find((book) => book.id === bookID);
  const newStatus = !book.read;
  book.read = newStatus;
  const readBtn = e.target;
  readBtn.textContent = newStatus ? 'Not read' : 'Read';
  const bookCardRead = document.getElementById(`read${bookID}`);
  bookCardRead.textContent = newStatus ? 'Read' : 'Not read';
}

function handleRemoveBtn(e) {
  const bookCard = e.target.parentNode;
  const bookID = bookCard.id;
  const bookIndex = library.findIndex((book) => book.id === bookID);
  library.splice(bookIndex, 1);
  const bookShelf = document.querySelector('.js-bookshelf');
  bookShelf.removeChild(bookCard);
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
