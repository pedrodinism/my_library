class Book {

    constructor(name, author) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.author = author;
    }

}

class Library {

    #bookList = [];

    addBook(book) {
        this.#bookList.push(book)
    }

    getBooks() {
        return this.#bookList;
    }
}

class UIController {
    constructor(library) {
        this.library = library;

        this.modal = document.querySelector('#dialogForm');
        this.bookInput = document.querySelector('#book');
        this.authorInput = document.querySelector('#author');
        this.tableBody = document.querySelector('#library tbody');

        this.initEvents();
    }

    initEvents() {
        document.addEventListener('click', (e) => {
            const id = e.target.id;

            switch (id) {
                case 'addBook':
                    this.openModal();
                    break;

                case 'submit':
                    this.submit();
                    break;

                case 'back':
                    this.closeModal();
                    break;
            }
        })
    }

    closeModal() {
        this.modal.close();
    }

    openModal() {
        this.modal.showModal();
    }

    clearForm() {
        this.bookInput.value = '';
        this.authorInput.value = '';
    }

    renderTable() {
        this.tableBody.innerHTML = ''

        const books = this.library.getBooks();

        for (const book of books) {   

            const row = document.createElement('tr')

            /*for (const prop in book) {
                const cell = document.createElement('td')
                cell.textContent = book[prop]
                row.appendChild(cell)
            }*/

            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
            `;

            this.tableBody.appendChild(row)
        }
    }

    submit() {
        const bookName = this.bookInput.value;
        const authorName = this.authorInput.value;

        this.library.addBook(new Book(bookName, authorName));

        this.renderTable();
        this.clearForm();
        this.closeModal();
    }
}

const library = new Library();
const ui = new UIController(library);