
const getBooks = async () => {
    try {
      return (await fetch("api/books/")).json();
    } catch (error) {
      console.log(error);
    }
  };

/*const showBooks = async () => {
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
};*/
const showBooks = async() => {
  let books = await getBooks();
  let booksDiv = document.getElementById("recipe-list");
  recipesDiv.innerHTML = "";
  books.forEach((book) => {
      const section = document.createElement("section");
      section.classList.add("book");
      booksDiv.append(section);

      const a = document.createElement("a");
      a.href = "#";
      section.append(a);

      const h3 = document.createElement("h3");
      h3.innerHTML = book.name;
      a.append(h3);

      a.onclick = (e) => {
          e.preventDefault();
          displayDetails(book);
      };
  });
};
const displayDetails = (book) => {
  const bookDetails = document.getElementById("recipe-details"); //fix id
  recipeDetails.innerHTML = "";

  const h3 = document.createElement("h3");
  h3.innerHTML = book.title;
  bookDetails.append(h3);

  const dLink = document.createElement("a");
  dLink.innerHTML = "	&#x2715;";
  bookDetails.append(dLink);
  dLink.id = "delete-link";

  const eLink = document.createElement("a");
  eLink.innerHTML = "&#9998;";
  bookDetails.append(eLink);
  eLink.id = "edit-link";

  const p = document.createElement("p");
  bookDetails.append(p);
  p.innerHTML = recipe.description;

  const ul = document.createElement("ul");
  bookDetails.append(ul);
  console.log(book.maincharacters);
  book.maincharacter.forEach((maincharacters) => {
      const li = document.createElement("li");
      ul.append(li);
      li.innerHTML = maincharacters;
  });

  eLink.onclick = (e) => {
      e.preventDefault();
      document.querySelector(".dialog").classList.remove("transparent");
      document.getElementById("add-edit-title").innerHTML = "Edit Book";
  };

  dLink.onclick = (e) => {
      e.preventDefault();
  };

  populateEditForm(book);
};




const addBook = async (e) => {
  e.preventDefault();
  const form = document.getElementById("book-form");
  const formData = new FormData(form);
  let response;

  if (true) {
    
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

  resetBookForm();
  document.querySelector(".dialog").classList.add("transparent");
  showBooks();
};
const resetBookForm = () => {
  const form = document.getElementById("book-form");
  form.reset();
  form.title.value = "";
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
};
  const showAddBook = () => {
    console.log("Showing add book form");
    document.getElementById("add-book-container").classList.remove("transparent");
  };
  
  const hideAddBook = () => {
    console.log("Hiding add book form");
    document.getElementById("add-book-container").classList.add("transparent");
  };

  const populateEditForm = (book) => {
    const form = document.getElementById("add-edit-recipe-form"); //fix id
    form.title.value = book.title;
    form.author.value = book.author;
    form.genre.value = book.genre;
    form.rating.value = book.rating;
    populateIngredient(recipe);
  };

  const addEditRecipe = async (e) => {
    e.preventDefault();
    const form = document.getElementById("add-edit-recipe-form"); //fix id
    const formData = new FormData(form);
    let response;
    formData.append("main characters", getMainCharacters());
  
    if (form.title.value == -1) {
      formData.delete("title");
  
      response = await fetch("/api/books", {
        method: "POST",
        body: formData,
      });
    }
    else {
      console.log(...formData);
  
      response = await fetch(`/api/books/${form.title.value}`, {
        method: "PUT",
        body: formData,
      });
    }
  
    if (response.status != 200) {
      console.log("Error posting data");
    }
  
    books = await response.json();
  
    if (form.title.value != -1) {
      displayDetails(book);
    }
  
    resetForm();
    document.querySelector(".dialog").classList.add("transparent");
    showBooks();
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