import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService, Book } from '../services/books.service';

import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { BookDetails } from '../book.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export default class BookComponent implements OnInit {
  books: any[] = [];
  

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getBooks();
    this.api.getBooks().subscribe(
    (response: any) => {
      this.books = response.books;
    },
    (error) => {
      console.error('Failed to get books:', error);
    });
  }

  getBooks() {
    this.api.getBooks().subscribe(
      (books) => {
        this.books = books;
        console.error(' get books:', this.books);
      },
      (error) => {
        console.error('Failed to get books:', error);
      }
    );
  }

  // Method to get the URL of the cover photo
  getCoverPhotoUrl(coverPhotoPath: string): string {
    // Replace this with the appropriate base URL of your backend API
    const baseUrl = 'http://localhost:3000/';
    return  coverPhotoPath;
  }

  // Method to get an array of image URLs
  getImagesUrls(imagePaths: string[]): string[] {
    // Replace this with the appropriate base URL of your backend API
    const baseUrl = 'http://localhost:3000/';
    return imagePaths.map((imagePath) => imagePath);
  }

  editBook(bookId: string): void {
    debugger
    // Navigate to the Edit Book component and pass the bookId as a parameter
    this.router.navigate(['/edit-book', bookId]);
  }
  delete(id: any, i: any) {
    console.log(id);
    if (window.confirm('are you sure to delete')) {
      this.api.deleteBook(id).subscribe((res) => {
        this.books.splice(i, 1);
      });
    }
  }
}
