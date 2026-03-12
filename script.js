let library = []

function Book(name, author) {
    this.id = crypto.randomUUID()
    this.name = name
    this.author = author
    this.read = false
}

Book.prototype.setRead = function () {
    this.read = !this.read
}

function addBookToLibrary(book) {
    library.push(book)
}

function createTable() {
    const tableBody = document.querySelector('#library tbody')
    tableBody.innerHTML = ''
    for (const book of library) {       
        const row = document.createElement('tr')
        const props = [
            book.id,
            book.name,
            book.author,
            book.read ? 'Yes' : 'No'
        ]
        for (const prop of props) {
                const cell = document.createElement('td')
                cell.textContent = prop
                row.appendChild(cell)
        }
        const cellAction = document.createElement('td')

        const deleteAction = document.createElement('p')
        deleteAction.textContent = "delete"
        deleteAction.classList.add("action")
        deleteAction.dataset.id = book['id']
        deleteAction.dataset.action = 'delete'
        cellAction.appendChild(deleteAction)

        const readAction = document.createElement('p')
        readAction.textContent = book.read ? "mark unread" : "mark read"
        readAction.classList.add("action")
        readAction.dataset.id = book['id']
        readAction.dataset.action = 'setAsRead'
        cellAction.appendChild(readAction)

        row.appendChild(cellAction)
        tableBody.appendChild(row)
    } 
}

const book = document.querySelector('#book')
const author = document.querySelector('#author')

function clearForm() {
    book.value = '' 
    author.value = ''
}

function showModal(){
    document.querySelector('#dialogForm').showModal()
}

function closeModal() {
    document.querySelector('#dialogForm').close()
}

const submitBtn = document.querySelector('#submit')

document.addEventListener('click', function(e) {
    const target = e.target

    if (target.classList.contains('action')) {
        const action = target.dataset.action
        const id = target.dataset.id

        switch (action) {
            case 'delete':
                deleteBook(id)
                return
            case 'setAsRead':
                const book = library.find(b => b.id === id)
                if (!book) return //make sure it doesn't return a runtime error if doesn't find anything

                book.setRead()
                createTable()
                return
        }
    }

    switch (target.id) {
        case 'addBook':
            showModal()
            return
        case 'back':
            closeModal()
            return
    }
})

const form = document.querySelector('#bookForm')

form.addEventListener('submit', function(e) {
    e.preventDefault()
    submit()
})

function submit () {
    const bookName = document.querySelector('#book').value
    const authorName = document.querySelector('#author').value 
    const newBook = new Book(bookName, authorName)
    addBookToLibrary(newBook)
    createTable()
    clearForm()
    closeModal()
}

function deleteBook(id) {
    library = library.filter(book => book.id !== id);
    createTable()
}

//const book = new Book('H', 'JK'); addBookToLibrary(book) - just some code to create a book and add it to the library

