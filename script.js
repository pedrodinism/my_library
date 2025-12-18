let library = []

function Book(name, author) {
    this.id = crypto.randomUUID()
    this.name = name
    this.author = author
}

function addBookToLibrary(book) {
    library.push(book)
}

function createTable() {
    const tableBody = document.querySelector('#library tbody')
    tableBody.innerHTML = ''
    for (const book of library) {       
        const row = document.createElement('tr')
        for (const prop in book) {
            const cell = document.createElement('td')
            cell.textContent = book[prop]
            row.appendChild(cell)
        }
        const cellAction = document.createElement('td')
        cellAction.textContent = "delete"
        cellAction.classList.add("action")
        cellAction.dataset.id = book['id']
        cellAction.dataset.action = 'delete'
        row.appendChild(cellAction)
        tableBody.appendChild(row)
    } 
}

function clearForm() {
    document.querySelector('#book').value = ''
    document.querySelector('#author').value = ''
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

        if (action === 'delete') deleteBook(id)
        return
    }

    switch (target.id) {
        case 'addBook':
            showModal()
            return
        case 'submit':
            submit()
            return
        case 'back':
            closeModal()
            return
    }
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

