import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { BookDetails } from '../book.model';

export interface Book {
  _id?: string; // Optional field for MongoDB document ID
  isbn: string;
  title: string;
  author: string;
  description: string;
  published_year: string;
  publisher: string;
  price: number;
  cover_photo?: File; // Optional field for the cover photo file
  images?: File[]; // Optional field for an array of image files
}


const httpOptions = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {


  private baseUrl = 'http://localhost:8081/api/books';

  constructor(private http: HttpClient) { }

  uploadBook(formData: FormData) {
    return this.http.post<any>(this.baseUrl, formData);
  }

  updateBook(bookId: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${bookId}`, formData);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${bookId}`);
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${bookId}`);
  }
}
