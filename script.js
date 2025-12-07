const library = []

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
        tableBody.appendChild(row)
    } 
}

function clearForm() {
    document.querySelector('#book').value = ''
    document.querySelector('#author').value = ''
}

const submitBtn = document.querySelector('#submit')

submitBtn.addEventListener('click', submit)

function submit () {
    const bookName = document.querySelector('#book').value
    const authorName = document.querySelector('#author').value 
    const newBook = new Book(bookName, authorName)
    addBookToLibrary(newBook)
    createTable()
    clearForm()
}



//const book = new Book('H', 'JK'); addBookToLibrary(book) - just some code to create a book and add it to the library

