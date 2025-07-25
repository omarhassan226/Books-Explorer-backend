const express = require("express");
const bookController = require("../controllers/book.controller");
const router = express.Router();

router.post("/", bookController.createBook);
router.get("/", bookController.getBooks);
router.get("/search", bookController.searchBooks);
router.get("/:id", bookController.getBookById);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

module.exports = router;
