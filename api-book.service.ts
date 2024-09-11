import {Book} from './book'

import axios from "axios"

const url='http://localhost:8000/api/books';

export class BooksServer{
    getAllBooks = async() =>{
        const result = await axios.get(url)
        return result.data;

    }

    getBookById = async (id?:string) => {
        var books = await this.getAllBooks()
        var result = books.find((eachItem : Book) => eachItem.id === id)
        if(result){
            return result
        }
        else{
            throw new Error(`Invalid Author Id${id}`)
        }
    }

    getBook = async (book : Book) => {

    }

    
}