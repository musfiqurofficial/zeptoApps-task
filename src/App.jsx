import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Wishlist from "./components/Wishlist";
import BookDetail from "./components/BookDetail";
import BookList from "./components/Booklist";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/book/:id" element={<BookDetail />} />
      </Routes>
    </>
  );
};

export default App;
