import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`https://gutendex.com/books/${id}`);
      const data = await res.json();
      setBook(data);
      setLoading(false);
    };
    fetchBook();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!book) return <p>Book not found!</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p>Author: {book.authors[0]?.name || 'Unknown'} ({book.authors[0]?.birth_year} - {book.authors[0]?.death_year})</p>
      <img src={book.formats['image/jpeg']} alt={book.title} className="w-full h-auto object-cover my-4"/>
      
      <p><strong>Genres:</strong> {book.subjects.join(', ') || 'No genre available'}</p>
      <p><strong>Bookshelves:</strong> {book.bookshelves.join(', ') || 'Not listed in any bookshelves'}</p>
      <p><strong>Languages:</strong> {book.languages.join(', ')}</p>
      <p><strong>Download Formats:</strong></p>
      <ul>
        <li><a href={book.formats['text/html']}>HTML</a></li>
        <li><a href={book.formats['application/epub+zip']}>EPUB</a></li>
        <li><a href={book.formats['application/x-mobipocket-ebook']}>MOBI</a></li>
        <li><a href={book.formats['text/plain; charset=us-ascii']}>Plain Text</a></li>
        <li><a href={book.formats['application/octet-stream']}>Zipped HTML</a></li>
      </ul>
      <p><strong>Download Count:</strong> {book.download_count}</p>
    </div>
  );
};

export default BookDetail;
