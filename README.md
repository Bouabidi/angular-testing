# AngularStateManagement

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.0.

## Setup

For the purposes of this article, I've created a new Angular application and bootstrapped a json-server into the project so we can make API requests and complement our learning process. By default, this API is running on localhost:3000.

* git clone https://github.com/Bouabidi/angular-testing.git
* cd  angular-testing
* npm install 
* Start JSON Server : json-server --watch db.json
* Start testing :ng test

## Testing Angular Services

We want to test services because these should house a lot of your business logic. 
Services were designed to house how data gets in and out of your application. This is why testing them is so valuable: if we can ensure data is getting in and out correctly, we can release with confidence when all of the tests pass.
Because of this, your services are usually where your highest code coverage should be. If your project is starting to get testing under control, services are a great place to start.

## What Do We Need to Unit Test?

There's a total of five functions, each making an API call to our json-server backend.
All functions we create, whether that's in a Component or Service, should have supporting test cases.

## Identifying What to Test in an Angular HTTP Service
Scan through the functions and determine the input and output. Is there anything else that would be beneficial for us to check?
1. Check that the functions return appropriate data (array of Books or a single Book).
2. Check that the expected API endpoint was called with the appropriate request method.
3. If an error occurs, check to make sure that the handleError function was called with the appropriate argument(s). NOTE: I won't be focussing on this test case in this article.



## Adding the HttpClientTestingModule to our Angular Unit Test File

Hier is the basic file of BooksService

```javascript
import { TestBed } from '@angular/core/testing';

import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

In order for the default test to pass in the Service, we need to bring in the HttpClientTestingModule - a module that provides all of the tools that we need to properly test Angular HTTP Services.


```javascript
import { HttpClientTestingModule } from '@angular/common/http/testing';
...

beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BooksService);
  });
```

## Unit Testing Pattern: Arrange-Act-Assert

When writing unit tests, follow the Arrange-Act-Assert (the 3 A's) pattern to help structure test cases.

1. Arrange - set up the test case. Does the test require any special preparation? Use this step to get the code under test (the Service function) in a place where we can make our assertions.

2. Act - execute the code under test. In order for us to determine the expected behavior of software, we need to run the code under test. Pass any necessary arguments to the code under test in order to achieve the expected behavior.

3. Assert - verify expected outcomes. This is the step that actually controls whether your test passes or fails.

## Writing an Angular Unit Test for the getAllBooks Function
It doesn't take any function arguments and is expected to return an array of Books.
Let's create a new test and add the following test logic:

```javascript
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { mockBookArray } from 'src/mocks/mockBooks';

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

    it('should call getAllBooks and return an array of Books', () => {

            // 1
          service.getAllBooks().subscribe((res) => {
                //2
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
}
```

Let's break it down.

1. Call the code under test - the getAllBooks function. This is part of the Act step in the Arrange-Act-Assert pattern.
2. Make sure the data coming back from the function is an array of Books, which we've mocked out and brought into this test file. This satisfies the Assert step in the Arrange-Act-Assert pattern. The function returns an Observable, so the only way to check the data that is being returned is to subscribe to the Observable and make the assertion inside.
3. We set up and utilize the HttpTestingController for multiple reasons, but here we're using it to specify the URL that we expect the Service function to hit, as well as the request method to be used.
4. We also use the HttpTestingController to flush (send) data through the stream.

## Writing a Unit Test for the getBookById Function
This function is similar to the first.

```javascript
import { mockBook1, mockBookArray } from 'src/mocks/mockBooks';
...
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
```
## Writing a Unit Test for the updateBook Function
Now let's look at the updateBook function. The same patterns apply here, but the request method is different.

```javascript
it('should call updateBook and return the updated book from the API', () => {
  const updatedBook: Book = {
    id: '1',
    title: 'New title',
    author: 'Author 1'
  };

  service.updateBook(mockBook1).subscribe((data) => {
    expect(data).toEqual(updatedBook);
  });

  const req = httpController.expectOne({
    method: 'PUT',
    url: `${url}/books`
  });

  req.flush(updatedBook);
});
```

## Writing a Unit Test for the addBook Function
```javascript
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
```

## Writing a Unit Test for the deleteBook Function
```javascript
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
```
