import { useState, useEffect } from "react";
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard";
import LoadingSkeleton from "./LoadingSkeleton";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("https://gutendex.com/books");
      const data = await res.json();
      setBooks(data.results);
      setLoading(false);
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleWishlist = (book) => {
    const currentWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const updatedWishlist = currentWishlist.some((item) => item.id === book.id)
      ? currentWishlist.filter((item) => item.id !== book.id)
      : [...currentWishlist, book];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

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

  const handleBookClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-5">
      <center className="relative">
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => {
            setTimeout(() => setShowDropdown(false), 200);
          }}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className={`px-6 py-3 mb-6 w-[80%] lg:w-[40%] bg-[#eeeeee] outline-none rounded-full`}
        />

        {showDropdown && filteredBooks.length > 0 && (
          <div className="absolute left-1/2 transform -translate-x-1/2 w-[80%] lg:w-[40%] bg-white border border-gray-200 shadow-md rounded-md z-10 max-h-60 overflow-auto text-start">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => handleBookClick(book.id)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                {book.title}
                <span className="text-[10px] block text-stone-500">
                  {book.authors[0]?.name || "Unknown"}
                </span>
              </div>
            ))}
          </div>
        )}
      </center>

      {loading ? (
        <LoadingSkeleton itemsPerPage={booksPerPage} />
      ) : (
        <>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
        </>
      )}
    </div>
  );
};

export default BookList;
