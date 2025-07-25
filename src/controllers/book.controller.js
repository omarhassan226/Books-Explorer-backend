const Book = require("../models/book.model");
const bookValidationSchema = require("../validations/book.validation");

exports.createBook = async (req, res) => {
  const { error } = bookValidationSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { title, author, category, price, description } = req.body;

  try {
    const newBook = new Book({ title, author, category, price, description });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Error creating book" });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error fetching books" });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book" });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Error updating book" });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook)
      return res.status(404).json({ message: "Book not found" });
    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book" });
  }
};

exports.searchBooks = async (req, res) => {
  const { title, author } = req.query;

  try {
    const query = {};

    if (title) {
      query.title = { $regex: `^${title}`, $options: "i" };
    }

    if (author) {
      query.author = { $regex: `^${author}`, $options: "i" };
    }

    console.log("🔍 Query:", query); // ✅ تتبع هنا

    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    console.error("❌ Error in searchBooks:", error); // ✅ تتبع الخطأ
    res.status(500).json({ message: "Error fetching book" });
  }
};
