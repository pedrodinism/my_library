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
    for (const book of library) {
        const tableBody = document.querySelector('#library tbody')
        const row = document.createElement('tr')
        for (const prop in book) {
            const cell = document.createElement('td')
            cell.textContent = book[prop]
            row.appendChild(cell)
        }
        tableBody.appendChild(row)
    } 
}

//const book = new Book('H', 'JK'); addBookToLibrary(book) - just some code to create a book and add it to the library

