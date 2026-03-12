class Book {

    constructor(name, author) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.author = author;
        this.isRead = false;
    }

    toggleIsRead() {
        this.isRead = !this.isRead;
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

    deleteBook(id) {
        this.#bookList = this.#bookList.filter((book) => book.id !== id);
    }
}

class UIController {
    constructor(library) {
        this.library = library;

        this.modal = document.querySelector('#dialogForm');
        this.bookInput = document.querySelector('#book');
        this.authorInput = document.querySelector('#author');
        this.tableBody = document.querySelector('#library tbody');
        this.form = document.querySelector('#bookForm');

        this.initEvents();
    }

    initEvents() {
        document.addEventListener('click', (e) => {
            const target = e.target;

            if (target.classList.contains('action')) {
                const action = target.dataset.action;
                const id = target.dataset.id;

                switch (action) {
                    case 'delete':
                        this.library.deleteBook(id);
                        this.renderTable();
                        return;
                    case 'setAsRead':
                        const book = this.library.getBooks().find(b => b.id === id);
                        if (!book) return;

                        book.toggleIsRead();
                        this.renderTable();
                        return;
                }
            }

            switch (target.id) {
                case 'addBook':
                    this.openModal();
                    return;
                case 'back':
                    this.closeModal();
                    return;
            }
        });

        this.form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.submit()
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
             const props = [
                book.id,
                book.name,
                book.author,
                book.isRead ? 'Yes' : 'No'
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
             readAction.textContent = book.isRead ? "mark unread" : "mark read"
             readAction.classList.add("action")
             readAction.dataset.id = book['id']
             readAction.dataset.action = 'setAsRead'
             cellAction.appendChild(readAction)

             row.appendChild(cellAction)
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