import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/books.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss'],
})
export class BookCreateComponent  {
  uploadForm: FormGroup;
  bookForm: FormGroup;
  coverPhotoFile: File | null = null; // To store the selected cover photo file
  responseMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: ApiService
  ) {
    this.bookForm = this.formBuilder.group({
      isbn: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      category: ['', Validators.required],

      description: ['', Validators.required],
      published_year: ['', Validators.required],
      publisher: ['', Validators.required],
      price: ['', Validators.required],
      // Add other form controls for the book attributes here
    });
  }

  createBook() {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.value;

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
    } else {
      // Handle form validation errors
      console.error('Form validation failed.');
    }
  }

  saveBook(bookData: any) {
    // if (this.uploadForm.invalid) {
    //   return;
    // }
   
    this.uploadService.uploadBook(bookData).subscribe(
      (response) => {
        console.log("responseresponseresponse", response)
        this.responseMessage = response.message;
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

  clearForm() {
    this.uploadForm.reset();
  }
}
