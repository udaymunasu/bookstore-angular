import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import BookComponent from './book/book.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import HomeComponent from './pages/home/home.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'forget',
    component: ForgetPasswordComponent,
  },
  {
    path: 'books/:id',
    component: BookDetailComponent,
    data: { title: 'Book Details' },
  },
  {
    path: 'book-create',
    component: BookCreateComponent,
    data: { title: 'Create Book' },
  },
  {
    path: 'books',
    component: BookComponent,
    data: { title: 'Book' },
  },
  {
    path: 'edit-book/:id',
    component: BookEditComponent,
    data: { title: 'Edit Book' },
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
