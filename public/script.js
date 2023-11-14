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
                img.src = /*"https://assignment14pt2.onrender.com"*/ book.img;
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
    eLink.onclick = (e) => {
      e.preventDefault();
      document.querySelector(".dialog").classList.remove("transparent");
      document.getElementById("add-edit-title").innerHTML = "Edit Recipe";
    };

    dLink.onclick = (e) => {
      e.preventDefault();
    };
    populateEditForm(book);
};

const populateEditForm = (book) => {};

const addBook = async () => {
  e.preventDefault();
  const form = document.getElementById("add-book-container");
  const formData = new FormData(form);
  let response;

  if (form._id.value == -1) {
      formData.delete("title");
      formData.delete("img");
      formData.append("maincharacter", getMainCharacter());

      console.log(...formData);

      response = await fetch("/api/books", {
          method: "POST",
          body: formData
      });
  }

    if (response.status != 200) {
        console.log("Error posting data");
    }

    response = await response.json();
    resetForm();
    document.querySelector(".dialog").classList.add("transparent");
    showRecipes();
  };
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