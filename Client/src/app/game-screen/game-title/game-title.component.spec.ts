import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTitleComponent } from './game-title.component';

describe('GameTitleComponent', () => {
  let component: GameTitleComponent;
  let fixture: ComponentFixture<GameTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
