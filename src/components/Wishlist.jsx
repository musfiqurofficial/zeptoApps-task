import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import LoadingSkeleton from "./LoadingSkeleton";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlist = () => {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setWishlist(storedWishlist);
      setLoading(false); 
    };

    setTimeout(fetchWishlist, 500);
  }, []);

  if (loading) {
    return (
        <LoadingSkeleton itemsPerPage={8} />
    );
  }

  if (!wishlist.length) {
    return <p className="text-center">No books in your wishlist!</p>;
  }

  return (
    <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 py-5">
      <h1 className="text-xl font-semibold mb-8">Your Wishlist</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {wishlist.map((book) => (
          <BookCard key={book.id} book={book} wishlist={wishlist} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
