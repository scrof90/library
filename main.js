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

/*
  "Add book" menu functions
*/

function initAddBookBtn() {
  const addBookBtn = document.querySelector('.js-btn-add-book');
  addBookBtn.onclick = handleAddBookBtnClick;
}

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
  clearForm(inputTitle, inputAuthor, checkboxRead);
  return newBook;
}

function clearForm(...inputs) {
  inputs.forEach((input) => {
    if (input.type === 'text') {
      input.value = '';
    } else if (input.type === 'checkbox') {
      input.checked = false;
    }
  });
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
  bookCard.id = book.id;
  bookCard.classList.add('book-card');
  const textBlock = createBookCardTextBlock(book.title, book.author);
  const btnsBlock = createBookCardBtnsBlock(book.id, book.isRead);
  bookCard.appendChild(textBlock);
  bookCard.appendChild(btnsBlock);
  return bookCard;
}

function createBookCardTextBlock(title, author) {
  const textContainer = document.createElement('div');
  textContainer.classList.add('book-card-text-container');
  const titleEl = document.createElement('h2');
  titleEl.textContent = title;
  const byEl = document.createElement('p');
  byEl.textContent = 'by';
  const authorEl = document.createElement('p');
  authorEl.textContent = author;
  textContainer.appendChild(titleEl);
  textContainer.appendChild(byEl);
  textContainer.appendChild(authorEl);
  return textContainer;
}

function createBookCardBtnsBlock(id, bookIsRead) {
  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('book-card-buttons-container');
  const readBtn = document.createElement('button');
  readBtn.dataset.id = id;
  readBtn.type = 'button';
  readBtn.classList.add('book-card-button');
  readBtn.onclick = handleReadBtn;
  setReadBtnStatus(readBtn, bookIsRead);
  buttonsContainer.appendChild(readBtn);
  const removeBtn = document.createElement('button');
  removeBtn.dataset.id = id;
  removeBtn.type = 'button';
  removeBtn.classList.add('book-card-button');
  removeBtn.classList.add('remove-button');
  removeBtn.onclick = handleRemoveBtn;
  removeBtn.textContent = 'X';
  buttonsContainer.appendChild(removeBtn);
  return buttonsContainer;
}

function setReadBtnStatus(btn, bookIsRead) {
  if (bookIsRead) {
    btn.classList.add('read-button');
    btn.classList.remove('not-read-button');
    btn.textContent = 'READ';
  } else {
    btn.classList.add('not-read-button');
    btn.classList.remove('read-button');
    btn.textContent = 'NOT READ';
  }
}

/*
  Book Card buttons functions
*/

function handleReadBtn(e) {
  const readBtn = e.target;
  const id = readBtn.dataset.id;
  const book = library.find((book) => book.id === id);
  book.changeReadStatus();
  setReadBtnStatus(readBtn, book.isRead);
}

function handleRemoveBtn(e) {
  const id = e.target.dataset.id;
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

// Populate Bookshelf from array

/*
function populateBookshelf(arr) {
  const bookShelf = document.querySelector('.js-bookshelf');
  bookShelf.innerHTML = '';
  arr.forEach((book) => addBookToBookshelf(book));
}
 */

// Random id generator;

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

/* function storageAvailable(type) {
  var storage;
  try {
    storage = window[type];
    var x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
} */

(function () {
  initAddBookBtn();

  /*   if (storageAvailable('localStorage')) {
  } else {
  } */
})();
