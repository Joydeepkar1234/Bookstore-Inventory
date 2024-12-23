// BookstoreInventoryNested.js

import React, { useState } from "react";

const BookstoreInventoryNested = () => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState({ genre: "", author: "" });
  const [form, setForm] = useState({
    id: null,
    title: "",
    author: "",
    genre: "",
    price: "",
    editions: [],
  });
  const [editionForm, setEditionForm] = useState({ year: "", ISBN: "" });

  // Handle main form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle edition form input changes
  const handleEditionChange = (e) => {
    const { name, value } = e.target;
    setEditionForm({ ...editionForm, [name]: value });
  };

  // Add edition to form data
  const addEdition = (e) => {
    e.preventDefault();
    setForm({ ...form, editions: [...form.editions, { ...editionForm }] });
    setEditionForm({ year: "", ISBN: "" });
  };

  // Add or edit book
  const addOrEditBook = (e) => {
    e.preventDefault();
    if (form.id) {
      setBooks(books.map((book) => (book.id === form.id ? { ...form } : book)));
    } else {
      setBooks([...books, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, title: "", author: "", genre: "", price: "", editions: [] });
  };

  // Delete a book
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  // Edit a book
  const editBook = (book) => {
    setForm(book);
  };

  // Delete an edition
  const deleteEdition = (index) => {
    setForm({
      ...form,
      editions: form.editions.filter((_, i) => i !== index),
    });
  };

  // Filter books
  const filteredBooks = books.filter((book) => {
    return (
      (!filter.genre || book.genre === filter.genre) &&
      (!filter.author || book.author.toLowerCase().includes(filter.author.toLowerCase()))
    );
  });

  return (
    <div>
      <h1>Bookstore Inventory with Nested Data</h1>

      {/* Filter Section */}
      <div>
        <h2>Filter Books</h2>
        <input
          type="text"
          name="author"
          placeholder="Filter by author"
          value={filter.author}
          onChange={(e) => setFilter({ ...filter, author: e.target.value })}
        />
        <select
          name="genre"
          value={filter.genre}
          onChange={(e) => setFilter({ ...filter, genre: e.target.value })}
        >
          <option value="">All Genres</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
        </select>
      </div>

      {/* Main Form Section */}
      <div>
        <h2>{form.id ? "Edit Book" : "Add Book"}</h2>
        <form onSubmit={addOrEditBook}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={form.author}
            onChange={handleInputChange}
            required
          />
          <select name="genre" value={form.genre} onChange={handleInputChange} required>
            <option value="">Select Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Fantasy">Fantasy</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleInputChange}
            required
          />

          {/* Edition Form */}
          <div>
            <h3>Add Edition</h3>
            <input
              type="number"
              name="year"
              placeholder="Year"
              value={editionForm.year}
              onChange={handleEditionChange}
              required
            />
            <input
              type="text"
              name="ISBN"
              placeholder="ISBN"
              value={editionForm.ISBN}
              onChange={handleEditionChange}
              required
            />
            <button onClick={addEdition}>Add Edition</button>
          </div>

          {/* List of Editions */}
          <ul>
            {form.editions.map((edition, index) => (
              <li key={index}>
                {edition.year} - {edition.ISBN}{" "}
                <button onClick={() => deleteEdition(index)}>Delete</button>
              </li>
            ))}
          </ul>

          <button type="submit">{form.id ? "Update Book" : "Add Book"}</button>
        </form>
      </div>

      {/* Book List Section */}
      <div>
        <h2>Book List</h2>
        {filteredBooks.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Price</th>
                <th>Editions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>${book.price}</td>
                  <td>
                    <ul>
                      {book.editions.map((edition, index) => (
                        <li key={index}>
                          {edition.year} - {edition.ISBN}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <button onClick={() => editBook(book)}>Edit</button>
                    <button onClick={() => deleteBook(book.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
};

export default BookstoreInventoryNested;
