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
                img.src = "https://assignment14pt2.onrender.com" + book.img;
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

const addBook = async () => {
    try {
  
        const title = document.querySelector('#book-form input[name="title"]').value;
        const author = document.querySelector('#book-form input[name="author"]').value;
        const genre = document.querySelector('#book-form input[name="genre"]').value;
        const img = document.querySelector('#book-form input[name="img"]').value; // Update this based on your form structure
        const rating = document.querySelector('#book-form input[name="rating"]').value;
        const maincharacters = document.querySelector('#book-form input[name="maincharacters"]').value.split(',').map(str => str.trim());

        if (!title || !author || !genre || !img || !rating || !maincharacters) {
          alert('Please fill in all required fields.');
          return;
        }
    

        const response = await fetch("/api/books", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            author,
            genre,
            img,
            rating,
            maincharacters,
          }),
        });
    
        if (response.ok) {
          showBooks();
        } else {
          alert('Failed to add the book. Please try again.');
        }
    
      } catch (error) {
        console.error("Error adding book:", error);
      } finally {
        hideAddBook(); 
      }
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
    document.getElementById("add-book-container").onclick = hideAddBook;
    document.querySelector(".close").onclick = hideAddBook;
};