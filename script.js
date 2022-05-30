function Book(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
}

const form = document.querySelector('#book-form')
const bookList = document.querySelector('#book-list')

function UI() {}

UI.prototype.addBookToList = (book) => {
    const list = document.querySelector('#book-list')

    const row = document.createElement('tr')

    row.innerHTML = `<td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href="" class="delete">X<a></td>`

    list.appendChild(row)
}

UI.prototype.showAlert = (message, className) => {
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

UI.prototype.deleteBook = (target) => {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove()
    }
}

UI.prototype.clearFields = () => {
    document.querySelector('#title').value = ''
    author = document.querySelector('#author').value = ''
    isbn = document.querySelector('#isbn').value = ''
}

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
        ui.showAlert('Book added', 'success')
    }

    ui.clearFields()
    e.preventDefault()
})

bookList.addEventListener('click', (e) => {

    const ui = new UI

    ui.deleteBook(e.target)

    ui.showAlert('Book removed!', 'success')

    e.preventDefault()
})