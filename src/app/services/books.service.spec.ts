import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { BooksService } from './books.service';
import { mockBook1, mockBook2, mockBook3, mockBookArray } from 'src/mocks/mockBooks';
import { Book } from '../models/book';

describe('BooksService', () => {
  let service: BooksService;
  let httpController: HttpTestingController;
  let url = 'localhost:3000/';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(BooksService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getAllBooks and return an array of Books', () => {
    // 1
    service.getAllBooks().subscribe((res) => {
      //2
      expect(res.length).toBe(3);
      expect(res).toEqual(mockBookArray);
    });

    //3
    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/books`,
    });

    //4
    req.flush(mockBookArray);
  });

  it('should call getBookById and return the appropriate Book', () => {
    // Arrange
    const id = '1';

    // Act
    service.getBookById(id).subscribe((data) => {
      // Assert
      expect(data).toEqual(mockBook1);
    });

    const req = httpController.expectOne({
      method: 'GET',
      url: `${url}/books/${id}`,
    });

    req.flush(mockBook1);
  });

  it('should call updateBook and return the updated book from the API', () => {
    const updatedBook: Book = {
      id: '1',
      title: 'New title',
      author: 'Author 1',
    };

    service.updateBook(mockBook1).subscribe((data) => {
      expect(data).toEqual(updatedBook);
    });

    const req = httpController.expectOne({
      method: 'PUT',
      url: `${url}/books`,
    });

    req.flush(updatedBook);
  });

  // test for addBook
  it('should call addBook and the API should return the book that was added', () => {
    service.addBook(mockBook2).subscribe((data) => {
      expect(data).toEqual(mockBook2);
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${url}/books`,
    });

    req.flush(mockBook2);
  });

  // test for 
  it('should call deleteBook and return the book that was deleted from the API', () => {
    service.deleteBook(mockBook3).subscribe((data) => {
      expect(data).toEqual(mockBook3);
    });

    const req = httpController.expectOne({
      method: 'DELETE',
      url: `${url}/books/${mockBook3.id}`,
    });

    req.flush(mockBook3);
  });
});
