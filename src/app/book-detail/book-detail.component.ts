import { Component, OnInit } from '@angular/core';
import { BookDetails } from '../book.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  book: any;
  bookId: any;
  getId: any;
  updateForm: FormGroup;

  constructor(
    private bookService: ApiService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedroute.params.subscribe(params => {
      const bookId = params['id'];
      this.getBookDetails(bookId);
    });
    
  }
  
  getBookDetails(bookId: string) {
    this.bookService.getBookById(bookId).subscribe(
      (book) => {
        this.book = book;
        console.log("this.book", this.book)
      },
      (error) => {
        console.error('Failed to get book details:', error);
      }
    );
  }

   // Utility method to get the URL of the cover photo
   getCoverPhotoUrl(coverPhotoPath: string): string {
    // Assuming your Node.js server is running on port 3000
    return `${coverPhotoPath}`;
  }
  // Utility method to get the URLs of the images
  getImagesUrls(imagePaths: string[]): string[] {
    // Replace 'localhost:3000' with your actual server URL if needed
    return imagePaths.map((imagePath) => `${imagePath}`);
  }
}
