import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesItemComponent } from './matches-item.component';

describe('MatchesItemComponent', () => {
  let component: MatchesItemComponent;
  let fixture: ComponentFixture<MatchesItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchesItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
