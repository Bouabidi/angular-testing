import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from '../models/user';

import { UserService } from './user.service';

describe('UserService', () => {
  let userService: UserService;
  let httpController: HttpTestingController;
  let url = 'localhost:3000/';
  const mockUsers: User[] = [
    {
      name: 'user1',
      id: 1,
      email: 'user1@gmail.com',
      tech: 'angular',
      dance: 'dance1',
    },
    {
      name: 'user2',
      id: 2,
      email: 'user2@gmail.com',
      tech: '.NET',
      dance: 'dance2',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    userService = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });
});
