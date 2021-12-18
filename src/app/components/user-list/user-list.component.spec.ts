import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

import { UserListComponent } from './user-list.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let el: DebugElement;
  let userService: UserService;
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

  beforeEach(async () => {
    const coursesServiceSpy = jasmine.createSpyObj('UserService', [
      'getAllUsers',
    ]);
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      providers: [{ provide: UserService, useValue: coursesServiceSpy }],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(UserListComponent);
        component = fixture.componentInstance;
        el = fixture.debugElement;
        userService = TestBed.inject(UserService);
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
