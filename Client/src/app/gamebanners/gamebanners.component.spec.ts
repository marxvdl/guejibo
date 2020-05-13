import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamebannersComponent } from './gamebanners.component';

describe('GamebannersComponent', () => {
  let component: GamebannersComponent;
  let fixture: ComponentFixture<GamebannersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamebannersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamebannersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
