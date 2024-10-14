/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

export default function BookCard({ book, handleWishlist, wishlist }) {
  return (
    <div className="overflow-hidden duration-300 bg-[#fefefe] rounded-xl shadow-sm h-[480px] relative border border-stone-200 cursor-pointer ">
      <div className="p-3">
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="object-cover mx-auto w-auto h-[300px] shadow hover:scale-105 transition-all"
        />
      </div>
      <div className="px-4">
        <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
          <Link
            to={`/book/${book.id}`}
            className="transition-colors duration-200 text-blue-gray-900 hover:text-purple-700"
          >
            Downloaded - {""}
          </Link>
          <span className="text-purple-700">{book.download_count}</span>
        </p>
        <Link
          to={`/book/${book.id}`}
          className="inline-block mb-2 text-xl font-bold leading-5 transition-colors duration-200 hover:text-purple-700"
        >
          {book.title}
        </Link>
        <p className="mb-2 text-gray-700 text-[12px]">
          <span className="text-[14px] font-semibold text-purple-700">
            Author:
          </span>{" "}
          {book.authors[0]?.name || "Unknown"}
        </p>
        <div className="absolute bottom-2 w-full space-x-4">
          <Link
            to={`/book/${book.id}`}
            className="hover:text-blue-600 px-4 py-2 bg-slate-100 hover:bg-slate-50 rounded-md text-[12px]"
          >
            View Details
          </Link>
          <button
            onClick={() => handleWishlist(book)}
            className="text-red-500 px-4 py-2 bg-slate-100 hover:bg-slate-50 rounded-md text-[12px]"
          >
            {wishlist.some((item) => item.id === book.id)
              ? "❤️ Wishlisted"
              : "♡ Wishlist"}
          </button>
        </div>
      </div>
    </div>
  );
}
