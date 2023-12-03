const express = require("express");
const server = express();
const Joi = require("joi");
server.use(express.static("public"));
server.use(express.json());
const cors = require("cors");
server.use(cors());
const multer = require("multer");
const mongoose = require("mongoose");

const upload = multer({ dest: __dirname + "/public/images" });

mongoose
  .connect(
    "mongodb+srv://doylemr:mongopassword@cluster0.afz2cbd.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to mongodb..."))
  .catch((err) => console.error("could not connect ot mongodb...", err));

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    rating: String,
    maincharacters: [String],
    img: String,
  });

  const Book = mongoose.model("Book", bookSchema);

  server.get("/api/books", (req, res) => {
    getBooks(res);
  });

  const getBooks = async (res) => {
    const books = await Book.find();
    res.send(books);
  };

  server.post("/api/books", upload.single("img"), (req, res) => {
    const result = validateBook(req.body);
  
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        rating: req.body.rating,
        maincharacters: req.body.maincharacters.split(","),
      });
      if (req.file) {
        book.img = "images/" + req.file.filename;
      }
      createBook(book, res);
});
const createBook = async (book, res) => {
    const result = await book.save();
    res.send(book);
  };
  server.put("/api/books/:title", upload.single("img"), (req, res) => {
    const result = validateBook(req.body);
  
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
      return;
    }
  
    updateBook(req, res);
  });
  const updateBook = async (req, res) => {
    let fieldsToUpdate = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      rating: req.body.rating,
      maincharacters: req.body.maincharacters.split(","),
    };
  
    if (req.file) {
      fieldsToUpdate.img = "images/" + req.file.filename;
    }
  
    const result = await Book.updateOne({ title: req.params.title }, fieldsToUpdate);
    const book = await Book.findById(req.params.title);
    res.send(book);
  };

  server.delete("/api/books/:title", upload.single("img"), (req, res) => {
    removeBook(res, req.params.title);
  });
  
  const removeBook = async (res, id) => {
    const book = await Recipe.findByIdAndDelete(id);
    res.send(book);
  };
  
  const validateBooks = (book) => {
    const schema = Joi.object({
      title: Joi.allow(""),
      maincharacters: Joi.allow(""),
      rating: Joi.allow(""),
      author: Joi.string().min(3).required(),
      genre: Joi.string().min(3).required(),
    });
  
    return schema.validate(book);
  };

/*let books = [{

        title: "Heir Of Fire",
        author: "Sarah J Maas",
        genre: "Fantasy",
        img: "/images/heiroffire.JPG",
        rating: "9/10",
        maincharacters: ["Aelin","Rowan", "Manon", "Dorian"]
    },
    {
        title: "Queen Of Shadows",
        author: "Sarah J Maas",
        genre: "Fantasy",
        img: "/images/queenofshadows.JPG",
        rating: "6/10",
        maincharacters: ["Aelin","Rowan", "Manon", "Dorian"]
    },
    {
        title: "Empire Of Storms",
        author: "Sarah J Maas",
        genre: "Fantasy",
        img: "/images/empireofstorms.JPG",
        rating: "7/10",
        maincharacters: ["Aelin","Rowan", "Manon", "Dorian"]
    },
    {
        title: "Kingdom of Ash",
        author: "Sarah J Maas",
        genre: "Fantasy",
        img: "/images/kingdomofash.JPG",
        rating: "8/10",
        maincharacters: ["Aelin","Rowan", "Manon", "Dorian"]
    },
    {
        title: "Fourth Wing",
        author: "Rebecca Yarros",
        genre: "Fantasy",
        img: "/images/fourthwing.JPG",
        rating: "9/10",
        maincharacters: ["Violet","Xaden", "Tairn", "Liam"]
    },
]

server.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

server.get("/api/books", (req, res) => {

    res.json(books);
});

server.post("/api/books", upload.single("img"), (req, res) => {
    const result = validateBook(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const book = {
        title: books.length + 1,
        author: req.body.author,
        genre: req.body.genre,
        rating: req.body.rating,
        maincharacters: req.body.maincharacters
    }
    books.push(book);
    res.send(books);
});


const validateBook = (book) => {
    const schema = Joi.object({
        title: Joi.allow(""),
        maincharacters: Joi.allow(""),
        author: Joi.string().min(3).required(),
        rating: Joi.allow(""),
        genre: Joi.allow("")
    });

    return schema.validate(book);
};*/

server.listen(3000, () => {
    console.log("listening");
});