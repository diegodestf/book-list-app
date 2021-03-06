// ES6

class Book {

    constructor(title, author, isbn) {

        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI {

    addBookToList(book) {

    const list = document.querySelector('#book-list')

    const row = document.createElement('tr')

    row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="" class="delete">X<a></td>`

    list.appendChild(row)

    }

    showAlert(message, className) {

    const div = document.createElement('div')

    div.className = `alert ${className}`

    div.appendChild(document.createTextNode(message))

    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')

    container.insertBefore(div, form)

    setTimeout(() => {
        document.querySelector('.alert').remove()
    }, 3000);

    }

    deleteBook(target) {

        if (target.className === 'delete') {
        target.parentElement.parentElement.remove()
    }

    }

    clearFields() {
    document.querySelector('#title').value = ''
    document.querySelector('#author').value = ''
    document.querySelector('#isbn').value = ''
    }
}

class Store {
    static getBooks() {
        let books;

        if (localStorage.getItem('books') === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem('books'))
        }

        return books
    }
    static displayBooks() {
        const books = Store.getBooks()

        books.forEach(book => {
            const ui = new UI

            ui.addBookToList(book)
        });
    }

    static addBook(book) {
        const books = Store.getBooks()

        books.push(book)

        localStorage.setItem('books', JSON.stringify(books))
    }


    static removeBook(isbn) {
        const books = Store.getBooks()

        books.forEach((book, idx) => {
            if (book.isbn === isbn) {
                books.splice(idx, 1)
            }
        });

        localStorage.setItem('books', JSON.stringify(books))
    }
}

const form = document.querySelector('#book-form')
const bookList = document.querySelector('#book-list')

document.addEventListener('DOMContentLoaded', Store.displayBooks)

form.addEventListener('submit', (e) => {
    const title = document.querySelector('#title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value

    const book = new Book(title, author, isbn)

    const ui = new UI()

    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all the fields', 'error')

    } else {
        ui.addBookToList(book)
        Store.addBook(book)
        ui.showAlert('Book added', 'success')
        ui.clearFields()

        
    }

    
    e.preventDefault()
})

bookList.addEventListener('click', (e) => {

    const ui = new UI

    ui.deleteBook(e.target)

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    ui.showAlert('Book removed!', 'success')

    e.preventDefault()
})




// ES5


// function Book(title, author, isbn) {
//     this.title = title
//     this.author = author
//     this.isbn = isbn
// }

// const form = document.querySelector('#book-form')
// const bookList = document.querySelector('#book-list')

// function UI() {}

// UI.prototype.addBookToList = (book) => {
//     const list = document.querySelector('#book-list')

//     const row = document.createElement('tr')

//     row.innerHTML = `<td>${book.title}</td>
//                     <td>${book.author}</td>
//                     <td>${book.isbn}</td>
//                     <td><a href="" class="delete">X<a></td>`

//     list.appendChild(row)
// }

// UI.prototype.showAlert = (message, className) => {
//     const div = document.createElement('div')

//     div.className = `alert ${className}`

//     div.appendChild(document.createTextNode(message))

//     const container = document.querySelector('.container')
//     const form = document.querySelector('#book-form')

//     container.insertBefore(div, form)

//     setTimeout(() => {
//         document.querySelector('.alert').remove()
//     }, 3000);

// }

// UI.prototype.deleteBook = (target) => {
//     if (target.className === 'delete') {
//         target.parentElement.parentElement.remove()
//     }
// }

// UI.prototype.clearFields = () => {
//     document.querySelector('#title').value = ''
//     document.querySelector('#author').value = ''
//     document.querySelector('#isbn').value = ''
// }

// form.addEventListener('submit', (e) => {
//     const title = document.querySelector('#title').value,
//           author = document.querySelector('#author').value,
//           isbn = document.querySelector('#isbn').value

//     const book = new Book(title, author, isbn)

//     const ui = new UI()

//     if (title === '' || author === '' || isbn === '') {
//         ui.showAlert('Please fill in all the fields', 'error')

//     } else {
//         ui.addBookToList(book)
//         ui.showAlert('Book added', 'success')
//     }

//     ui.clearFields()
//     e.preventDefault()
// })

// bookList.addEventListener('click', (e) => {

//     const ui = new UI

//     ui.deleteBook(e.target)

//     ui.showAlert('Book removed!', 'success')

//     e.preventDefault()
// })