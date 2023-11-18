
const getBooks = async () => {
    try {
      return (await fetch("api/books/")).json();
    } catch (error) {
      console.log(error);
    }
  };
const showBooks = async () => {
    try {
        const booksJSON = await getBooks();
        const bookDiv = document.getElementById("bookContainer");

        if (booksJSON && booksJSON.length > 0) {
            booksJSON.forEach((book) => {
                const section = document.createElement("div");
                section.classList.add("book");


                const img = document.createElement("img");
                img.src = book.img;
                img.classList.add("book-image");
                section.appendChild(img);

                const bookInfo = document.createElement("div");
                bookInfo.classList.add("book-info");
                section.appendChild(bookInfo);

                const h2 = document.createElement("h2");
                h2.textContent = book.title;
                bookInfo.appendChild(h2);

                const author = document.createElement("p");
                author.textContent = `Author: ${book.author}`;
                bookInfo.appendChild(author);

                const genre = document.createElement("p");
                genre.textContent = `Genre: ${book.genre}`;
                bookInfo.appendChild(genre);

                const rating = document.createElement("p");
                rating.textContent = `Rating: ${book.rating}`;
                bookInfo.appendChild(rating);

                const characters = document.createElement("p");
                characters.textContent = `Main Characters: ${book.maincharacters.join(', ')}`;
                bookInfo.appendChild(characters);

                bookDiv.appendChild(section);
            });
        } else {
            console.log("No books found");
        }
    } catch (error) {
        console.log("Error retrieving or displaying books:", error);
    }
};



const addBook = async (e) => {
  e.preventDefault();
  const form = document.getElementById("book-form");
  const formData = new FormData(form);
  let response;

  if (form.title.value === "") {
    formData.delete("title");

    response = await fetch("/api/books", {
      method: "POST",
      body: formData,
    });
  } else {
    console.log(...formData);

    response = await fetch(`/api/books/${form.title.value}`, {
      method: "PUT",
      body: formData,
    });
  }

  if (response.status !== 200) {
    console.log("Error posting data");
  }

  const book = await response.json();

  if (form.title.value !== "") {
    showBooks(book);
  }

  resetForm();
  document.querySelector(".dialog").classList.add("transparent");
  showBooks();
};

const resetForm = () => {
  const form = document.getElementById("book-form");
  form.reset();
  form.title.value = "";
};


  const getMainCharacters = () => {
    const inputs = document.querySelectorAll("#book-container");
    let maincharacter = [];

    inputs.forEach((input) => {
        maincharacter.push(input.value);
    });

    return maincharacter;
}
  const populateBookEditForm = (book) => {
    const form = document.getElementById("book-form");
    form.title.value = book.title;
    form.author.value = book.author;
    form.rating.value = book.rating;
    form.maincharacter.value = book.maincharacter;
  };

  const deleteBook = async(book) => {
    let response = await fetch(`/api/books/${book.title}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    });

    if (response.status != 200) {
        console.log("error deleting");
        return;
    }

    let result = await response.json();
    showBooks();
    document.getElementById("book-container").innerHTML = "";
    resetForm();
}
  const showAddBook = () => {
    console.log("Showing add book form");
    document.getElementById("add-book-container").classList.remove("transparent");
  };
  
  const hideAddBook = () => {
    console.log("Hiding add book form");
    document.getElementById("add-book-container").classList.add("transparent");
  };
  

window.onload = () => {
    showBooks();
    document.getElementById("book-form").onsubmit = addBook;
    document.getElementById("add-book").onclick = showAddBook;
  
    document.querySelector(".close").onclick = () => {
      hideAddBook();
    };
    document.getElementById("add-book").onclick = showAddBook;
    document.querySelector(".close").onclick = hideAddBook;
};