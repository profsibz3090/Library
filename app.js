// title, author, the number of pages, and whether or not you have read the book.

let myLibrary = [
    {
        title: 'Atomic Habits',
        author: 'James Clear',
        pages: 183,
        isRead: false,
    },
  
];

const libraryElement = document.querySelector('.library')

function displayBooks() {
    const read = `<input type="checkbox" name="isRead" id="isRead" value="isRead" checked>`;
    const notRead = ` <input type="checkbox" name="isRead" id="isRead" value="isRead">`;
    let id = 0;
    return myLibrary.map((book) => {
      return ` <div class="book">
                   <div class="content">
                      <p class="title">${book.title}</p>
                      <p class="author"><i>${book.author}</i></p>
                      <p class="pages">${book.pages} pages</p>
                       <div class="isRead">
                           <label for="isRead">isRead</label>
                           ${book.isRead? read : notRead}
                       </div>
                       <button data-id=${id++} class="delete">
                         Delete
                        </button>
                   </div>
                </div>
                `
    });
}

function run () {
    const books = displayBooks();
    const longString = books.reduce((prev,curr) => {
       return prev += curr;   
    }, "");
    console.log(longString)
    libraryElement.innerHTML = longString;

    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    checkBoxes.forEach((checkbox => {
    checkbox.addEventListener('click', (event) => {
        toggleChecked(event.target.checked)
        event.target.checked = isRead ?  true : false;
        // event.target.checked = !event.target.checked;
    })
   }));
   
   document.querySelectorAll('.delete').forEach(e => e.addEventListener('click', deleteBook))

}

function toggleChecked(isReadProperty) {
   isRead = isReadProperty;
}

function toggleForm() {
    document.querySelector('.add-book').addEventListener('click', (e) => {
        document.querySelector('form').classList.remove('toggle-form')
    });
    document.querySelector('.close-form').addEventListener('click', (e) => {
        document.querySelector('form').classList.add('toggle-form')
    });
}

toggleForm()

function Book(title, author, pages, isRead) {
//   this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleIsRead = function () {
    this.isRead = !this.isRead;
}


function addBookToLibrary(event) {
  // do stuff here
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = Number(document.getElementById('pages').value);
  const isRead = document.getElementById('isRead').checked === true ? true : false;
  const book = new Book(title, author, pages, isRead);
  myLibrary.push(book);
  console.log(myLibrary)
  run();
}

document.querySelector('form button').addEventListener('click', addBookToLibrary);

function deleteBook(event) {
    const index = event.target.dataset.id;
    myLibrary.splice(index,1)
    console.log(myLibrary)
    run();
}

run()
