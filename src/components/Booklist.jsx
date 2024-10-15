import { useState, useEffect, useContext } from "react";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import BookCard from "./BookCard";
import LoadingSkeleton from "./LoadingSkeleton";
import { AllContext } from "../context/AllContext";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const {
    wishlist,
    handleWishlist,
    searchTerm,
    setShowDropdown,
    setFilteredBooks,
  } = useContext(AllContext);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("https://gutendex.com/books");
      const data = await res.json();
      const sortedBooks = data.results.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
      setBooks(sortedBooks);
      setLoading(false);
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
  }, [searchTerm, books, setFilteredBooks, setShowDropdown]);

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="">
      {loading ? (
        <LoadingSkeleton itemsPerPage={booksPerPage} />
      ) : (
        <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-5">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                handleWishlist={handleWishlist}
                wishlist={wishlist}
              />
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 ${
                currentPage === 1
                  ? "cursor-not-allowed text-slate-300"
                  : "hover:text-slate-600 text-slate-400"
              }`}
            >
              <IoArrowBackCircleOutline className="w-6 h-6" />
            </button>
            <span className="mx-4">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 ${
                currentPage === totalPages
                  ? "cursor-not-allowed text-slate-300"
                  : "hover:text-slate-600 text-slate-400"
              }`}
            >
              <IoArrowForwardCircleOutline className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
