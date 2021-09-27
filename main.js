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

function addBookToLibrary(title, author, read) {
  const newBook = new Book(title, author, read);
  library.push(newBook);
  newBook.setID();
  updateBookshelf();
}

function updateBookshelf() {
  library.forEach((book) => {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    bookCard.innerHTML = book.getHTMLTemplate();
    document.querySelector('.js-bookshelf').appendChild(bookCard);
  });
}

addBookToLibrary('Zlaty Troll', 'O.S. Leshev', 100, true);
