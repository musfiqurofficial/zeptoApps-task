import { useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AllContext } from "../context/AllContext";
import { IoSearchCircle } from "react-icons/io5";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const menuRef = useRef(null);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const {
    searchTerm,
    setSearchTerm,
    showDropdown,
    setShowDropdown,
    filteredBooks,
    handleBookClick,
  } = useContext(AllContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showDropdown && filteredBooks.length > 0) {
        if (e.key === "ArrowDown") {
          setSelectedIndex((prevIndex) =>
            prevIndex < filteredBooks.length - 1 ? prevIndex + 1 : prevIndex
          );
        } else if (e.key === "ArrowUp") {
          setSelectedIndex((prevIndex) =>
            prevIndex > 0 ? prevIndex - 1 : prevIndex
          );
        } else if (e.key === "Enter" && selectedIndex !== -1) {
          handleBookClick(filteredBooks[selectedIndex].id);
          setShowDropdown(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showDropdown, filteredBooks, selectedIndex, handleBookClick]);

  useEffect(() => {
    if (dropdownRef.current && selectedIndex !== -1) {
      const selectedItem = dropdownRef.current.children[selectedIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="bg-[#F8F8F8]">
      <div className="px-4 py-3 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="relative flex items-center justify-between">
          <Link to="/" className="inline-flex items-center">
            <svg
              className="w-8 text-[#222]"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              stroke="currentColor"
              fill="none"
            >
              <rect x="3" y="1" width="7" height="12" />
              <rect x="3" y="17" width="7" height="6" />
              <rect x="14" y="1" width="7" height="6" />
              <rect x="14" y="11" width="7" height="12" />
            </svg>
            <span className="ml-2 text-xl font-bold tracking-wide text-[#666] uppercase sm:block hidden">
              Company
            </span>
          </Link>
          <div className="relative md:w-[50%] mx-auto">
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
                setSelectedIndex(-1);
              }}
              className="px-6 py-3 w-full bg-[#F8F8F8] outline-none rounded-full border border-[#333]"
            />
            <IoSearchCircle className="w-12 h-12 text-blue-500 absolute top-1/2 right-1 cursor-pointer transform -translate-y-1/2" />
            {showDropdown && filteredBooks.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute left-1/2 top-14 py-2 transform -translate-x-1/2 w-[80%] bg-white border border-gray-200 shadow-md rounded-md z-10 max-h-60 overflow-auto text-start"
              >
                {filteredBooks.map((book, index) => (
                  <div
                    key={book.id}
                    onClick={() => handleBookClick(book.id)}
                    className={`flex justify-between items-start gap-4 px-4 py-2 hover:bg-gray-100 border-b border-stone-100 cursor-pointer ${
                      selectedIndex === index
                        ? "bg-gray-200"
                        : index % 2 === 0
                        ? "bg-white"
                        : "bg-[#F8F8F8]"
                    }`}
                  >
                    <div className="flex flex-col">
                      <p>{book.title}</p>
                      <span className="text-[10px] block text-stone-500">
                        {book.authors[0]?.name || "Unknown"}
                      </span>
                    </div>
                    <img
                      src={book.formats["image/jpeg"]}
                      alt={book.title}
                      className="w-8 h-auto"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <ul className="flex items-center hidden space-x-8 lg:flex">
            <li>
              <Link
                to="/"
                className={`font-medium tracking-wide transition-colors duration-200 hover:text-blue-400 ${
                  location.pathname === "/" ? "text-blue-400" : "text-[#222]"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                className={`font-medium tracking-wide transition-colors duration-200 hover:text-blue-400 ${
                  location.pathname === "/wishlist"
                    ? "text-blue-400"
                    : "text-[#222]"
                }`}
              >
                Wishlist
              </Link>
            </li>
          </ul>

          <div className="ml-auto lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-gray-200"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg className="w-5 text-[#222]" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full z-10" ref={menuRef}>
                <div className="p-5 bg-white border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        to="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg
                          className="w-8 text-[#000]"
                          viewBox="0 0 24 24"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          stroke="currentColor"
                          fill="none"
                        >
                          <rect x="3" y="1" width="7" height="12" />
                          <rect x="3" y="17" width="7" height="6" />
                          <rect x="14" y="1" width="7" height="6" />
                          <rect x="14" y="11" width="7" height="12" />
                        </svg>
                        <span className="ml-2 text-xl font-bold tracking-wide text-[#222] uppercase">
                          Company
                        </span>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <Link
                          to="/"
                          className={`font-medium tracking-wide transition-colors duration-200 ${
                            location.pathname === "/"
                              ? "text-blue-400"
                              : "text-[#222]"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/wishlist"
                          className={`font-medium tracking-wide transition-colors duration-200 ${
                            location.pathname === "/wishlist"
                              ? "text-blue-400"
                              : "text-[#222]"
                          }`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Wishlist
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
