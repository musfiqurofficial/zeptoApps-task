import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AllContext } from "../context/AllContext";
import { CiShare1 } from "react-icons/ci";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { Autoplay } from "swiper/modules";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { books, wishlist, handleWishlist } = useContext(AllContext);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`https://gutendex.com/books/${id}`);
      const data = await res.json();
      setBook(data);
      setLoading(false);

      const related = books
        .filter(
          (b) =>
            b.id !== data.id &&
            b.subjects.some((subject) => data.subjects.includes(subject))
        )
        .slice(0, 6);
      setRelatedBooks(related);
    };
    fetchBook();
  }, [id, books]);

  if (loading)
    return (
      <div className="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="flex items-center justify-center w-full h-[70vh] text-gray-600">
          <div>
            <h1 className="text-xl md:text-7xl font-bold flex items-center">
              L
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                className="animate-spin"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13.6695 15.9999H10.3295L8.95053 17.8969L9.5044 19.6031C10.2897 19.8607 11.1286 20 12 20C12.8714 20 13.7103 19.8607 14.4956 19.6031L15.0485 17.8969L13.6695 15.9999ZM5.29354 10.8719L4.00222 11.8095L4 12C4 13.7297 4.54894 15.3312 5.4821 16.6397L7.39254 16.6399L8.71453 14.8199L7.68654 11.6499L5.29354 10.8719ZM18.7055 10.8719L16.3125 11.6499L15.2845 14.8199L16.6065 16.6399L18.5179 16.6397C19.4511 15.3312 20 13.7297 20 12L19.997 11.81L18.7055 10.8719ZM12 9.536L9.656 11.238L10.552 14H13.447L14.343 11.238L12 9.536ZM14.2914 4.33299L12.9995 5.27293V7.78993L15.6935 9.74693L17.9325 9.01993L18.4867 7.3168C17.467 5.90685 15.9988 4.84254 14.2914 4.33299ZM9.70757 4.33329C8.00021 4.84307 6.53216 5.90762 5.51261 7.31778L6.06653 9.01993L8.30554 9.74693L10.9995 7.78993V5.27293L9.70757 4.33329Z"></path>
              </svg>{" "}
              ading . . .
            </h1>
          </div>
        </div>
      </div>
    );
  if (!book) return <p>Book not found!</p>;

  return (
    <div className="">
      <h3 className="text-[18px] font-semibold px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 mt-4">
        Preview Page
      </h3>
      <hr className="my-6" />
      <div className="md:flex justify-start items-start gap-10 px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="w-auto h-[340px] shadow-xl"
        />
        <div>
          <h1 className="text-2xl font-bold">{book.title}</h1>
          <p className="text-[16px] font-semibold text-blue-500 mt-4">
            {book.authors[0]?.name || "Unknown"} ({book.authors[0]?.birth_year}{" "}
            - {book.authors[0]?.death_year})
          </p>
          <div className="mt-20">
            <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
              <Link
                to={`/book/${book.id}`}
                className="transition-colors duration-200 text-blue-gray-900 hover:text-purple-700"
              >
                Downloaded - {""}
              </Link>
              <span className="text-purple-700">{book.download_count}</span>
            </p>
            <div className="w-full space-x-4 flex justify-between items-center gap-10">
              <button
                onClick={() => handleWishlist(book)}
                className="text-red-500 px-4 py-2 border border-red-500 hover:bg-slate-100  rounded-md"
              >
                {wishlist.some((item) => item.id === book.id)
                  ? "❤️ Wishlisted"
                  : "♡ Wishlist"}
              </button>
              <button>
                <CiShare1 className="w-4 h-4 text-blue-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <div className="bg-[#F8F8F8] py-4 my-3">
        <p className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <strong>Genres:</strong>{" "}
          {book.subjects.join(", ") || "No genre available"}
        </p>
      </div>
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <p>
          <strong>Bookshelves:</strong>{" "}
          {book.bookshelves.join(", ") || "Not listed in any bookshelves"}
        </p>
      </div>
      <div className="bg-[#F8F8F8] py-4 my-3">
        <p className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          <strong>Languages:</strong>{" "}
          <span className="uppercase">{book.languages.join(", ")}</span>
        </p>
      </div>
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <p>
          <strong>Download Formats:</strong>
        </p>
        <ul className="flex justify-evenly md:justify-start mt-4 items-center gap-2 md:gap-4 text-[10px] md:text-[12px]">
          <li className="px-4 py-1 rounded bg-[#F8F8F8]">
            <a href={book.formats["text/html"]}>HTML</a>
          </li>
          <li className="px-4 py-1 rounded bg-[#F8F8F8]">
            <a href={book.formats["application/epub+zip"]}>EPUB</a>
          </li>
          <li className="px-4 py-1 rounded bg-[#F8F8F8]">
            <a href={book.formats["application/x-mobipocket-ebook"]}>MOBI</a>
          </li>
          <li className="px-4 py-1 rounded bg-[#F8F8F8]">
            <a href={book.formats["text/plain; charset=us-ascii"]}>
              Plain Text
            </a>
          </li>
          <li className="px-4 py-1 rounded bg-[#F8F8F8]">
            <a href={book.formats["application/octet-stream"]}>Zipped HTML</a>
          </li>
        </ul>
      </div>
      <hr className="my-6" />
      <div className="related-posts py-4">
        <h2 className="text-xl font-semibold mb-4 px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
          Related Books
        </h2>
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          slidesPerGroup={1}
          autoplay={{
            delay: 5500,
            disableOnInteraction: false,
          }}
          loop={true}
          loopFillGroupWithBlank={true}
          breakpoints={{
          
            320: {
              slidesPerView: 2,
              spaceBetween: 150,
            },
            480: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 180,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay]}
          className="mySwiper px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8"
        >
          {relatedBooks.map((relatedBook) => (
            <SwiperSlide key={relatedBook.id}>
              <Link
                to={`/book/${relatedBook.id}`}
                className="block text-center"
              >
                <center>
                  <img
                    src={relatedBook.formats["image/jpeg"]}
                    alt={relatedBook.title}
                    className="w-auto h-[200px] mb-2"
                  />
                </center>
                <h3 className="text-sm font-bold">{relatedBook.title}</h3>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BookDetail;
