import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { Book } from '../services/book';
import { action } from '../utils/action-creator';
import { useStatusContext } from './status.context';
import { BooksServer } from '../services/api-book.service';

const BookUserContext = createContext<any>(null);

interface BooksStore {
  books: Book[];
  selectedBook: Book | null;
}

const defaultStore: BooksStore = {
  books: [],
  selectedBook: null,
};

const booksReducer = (booksStore: BooksStore = defaultStore, action: any): BooksStore => {
  switch (action.type) {
    case 'BOOKS_LIST':
      return {
        ...booksStore,
        books: action.payload,
      };
    case 'BOOK_SELECT':
      return {
        ...booksStore,
        selectedBook: action.payload,
      };
    case 'BOOK_REMOVE':
      return {
        ...booksStore,
        books: booksStore.books.filter((b: Book) => b.id !== action.payload),
        selectedBook: null,
      };
    case 'BOOK_UPDATE':
      return {
        ...booksStore,
        books: booksStore.books.map((b: Book) => b.id === action.payload.id ? action.payload : b),
        selectedBook: action.payload,
      };
    case 'BOOK_ADD':
      return {
        ...booksStore,
        books: [...booksStore.books, action.payload],
        selectedBook: action.payload,
      };
    default:
      return booksStore;
  }
};

export const useBookContext = () => useContext(BookUserContext);

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const service = new BooksServer();
  const [booksStore, dispatch] = useReducer(booksReducer, defaultStore);
  const { setStatus } = useStatusContext(); // Use the status context for status management

  const actions = {
    getAllBooks: action(service.getAllBooks, dispatch, setStatus, 'BOOKS_LIST'),
    
  };

  return (
    <BookUserContext.Provider value={{ ...actions, ...booksStore }}>
      {children}
    </BookUserContext.Provider>
  );
};
