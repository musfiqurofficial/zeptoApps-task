# Gutenberg Book App

This is a React-based web application that allows users to browse books fetched from the Gutenberg Project API. Users can search for books, view book details, manage a wishlist, and explore related books via a Swiper slider. 

## Features

- **Book List**: Displays a list of books with pagination.
- **Search**: Allows users to search for books by title.
- **Book Details**: Displays detailed information about each book, including title, author, genres, and available download formats.
- **Wishlist**: Allows users to add/remove books to/from their wishlist, persisted in `localStorage`.
- **Related Books Slider**: Shows related books based on genres in a Swiper slider within the book detail page.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Components](#components)
4. [Context](#context)
5. [Dependencies](#dependencies)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/musfiqurofficial/zeptoApps-task.git
    cd gutenberg-book-app
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. Open your browser and go to http://localhost:5173/`.

## Usage

### Main Features

- **Browse Books**: The homepage (`BookList`) allows users to browse through books fetched from the [Gutenberg API](https://gutendex.com/). Books are paginated for ease of navigation.
- **Search Functionality**: Search for books by title using the search bar. The dropdown displays matching results in real-time.
- **Book Details Page**: Clicking on a book leads to the detailed view of the book, where users can view the book's cover, author, download formats, and other information.
- **Related Books**: The detailed view also shows related books in a Swiper slider, which automatically slides through similar books (based on genre).
- **Wishlist**: Users can add or remove books to/from their wishlist, and the data persists across sessions using `localStorage`.

## Components

### 1. `BookList`

This component displays a paginated list of books. It fetches the list of books from the Gutenberg API, manages pagination, and handles the wishlist button functionality.

Key Features:
- Pagination with next/previous buttons.
- Wishlist handling.
- Search term filtering.

### 2. `BookDetail`

This component shows detailed information about a single book, such as its title, author, genres, languages, and download links. It also features a Swiper slider that displays related books based on the book's genres.

Key Features:
- Book details fetched by ID from the Gutenberg API.
- Wishlist functionality.
- Related books slider with Swiper integration.

### 3. `BookCard`

A reusable card component that displays book information (image, title) in the grid list view.

### 4. `LoadingSkeleton`

A component that displays a skeleton screen while the data is being loaded from the API.

## Context

The `AllContext` provides a global state management solution for handling shared states like:
- The list of books.
- Wishlist functionality.
- Search term handling and filtering.
- Pagination and navigation between book details pages.

It ensures data persistence and eliminates the need for redundant API calls.

### Context Methods:
- `handleWishlist`: Add or remove books from the wishlist.
- `setSearchTerm`: Updates the search term entered by the user.
- `handleBookClick`: Navigate to a book’s detail page.
- `books`: Globally fetched list of all books.

## Dependencies

The project uses the following key dependencies:

- **React**: A JavaScript library for building user interfaces.
- **React Router**: For navigating between different pages in the application.
- **Swiper**: For implementing the auto-sliding book-related posts in the `BookDetail` page.
- **React Icons**: For providing vector icons used in buttons (wishlist, navigation).
- **Tailwind CSS**: For styling the components and layout.

### Installation of Dependencies:

If you need to install any of the dependencies manually, run the following:

```bash
npm install react-router-dom swiper react-icons tailwindcss
