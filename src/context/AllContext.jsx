/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AllContext = createContext();

export const ContextProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [books, setBooks] = useState([]);

  const navigate = useNavigate();

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const handleWishlist = (book) => {
    const updatedWishlist = wishlist.some((item) => item.id === book.id)
      ? wishlist.filter((item) => item.id !== book.id)
      : [...wishlist, book];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("https://gutendex.com/books");
      const data = await res.json();
      const sortedBooks = data.results.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setBooks(sortedBooks);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
      setShowDropdown(true);
    } else {
      setFilteredBooks([]);
      setShowDropdown(false);
    }
  }, [searchTerm, books]);

  return (
    <AllContext.Provider
      value={{
        wishlist,
        handleWishlist,
        searchTerm,
        setSearchTerm,
        showDropdown,
        setShowDropdown,
        filteredBooks,
        setFilteredBooks,
        handleBookClick,
        books,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
