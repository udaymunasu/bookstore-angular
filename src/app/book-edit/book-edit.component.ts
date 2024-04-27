import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/books.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  bookId: string;
  bookForm: FormGroup;
  coverPhotoFile: File | null = null; // To store the selected cover photo file


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: ApiService,
    private formBuilder: FormBuilder,
  ) {
    this.bookForm = this.formBuilder.group({
      isbn: [''],
      title: [''],
      author: [''],
      category: [''],
      description: [''],
      publishedYear: [''],
      publisher: [''],
      price: [''],
      coverPhoto: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.bookId =  this.route.snapshot.paramMap.get('id') || '';
      debugger

      console.log(" this.bookId ",  this.bookId )

      // Fetch the book's details using bookId and populate the form
      this.bookService.getBookById(this.bookId).subscribe((book) => {
        this.bookForm.patchValue(book);
      });
    });
  }

  editBook(): void {
    
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;
      // Send a PUT request to update the book's details
      if (this.coverPhotoFile) {
        // Convert the cover photo file to a Base64 string
        const reader = new FileReader();
        reader.onload = () => {
          bookData.cover_photo = reader.result as string; // Save the Base64 string
          this.saveBook(bookData);
        };
        reader.readAsDataURL(this.coverPhotoFile);
      } else {
        // Handle the case when no cover photo is selected
        console.error('Please select a cover photo.');
      }
    }
  }

  responseMessage = '';
  saveBook(bookData: any) {
    // if (this.uploadForm.invalid) {
    //   return;
    // }
   
    this.bookService.updateBook(this.bookId,bookData).subscribe(
      (response) => {
        console.log("responseresponseresponse edit book", response)
        this.responseMessage = response.message;
        this.router.navigate([`books/${this.bookId}`]);
      },
      (error) => {
        console.error(error);
        this.responseMessage = 'Failed to create the user.';
      }
    );
  }

  onFileSelected(event: any) {
    this.coverPhotoFile = event.target.files[0]; // Store the selected file
  }
}
