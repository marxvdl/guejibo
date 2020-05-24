import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingUserComponent } from './waiting-user.component';

describe('WaitingUserComponent', () => {
  let component: WaitingUserComponent;
  let fixture: ComponentFixture<WaitingUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
