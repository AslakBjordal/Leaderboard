import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardItemComponent } from './scoreboard-item.component';

describe('ScoreboardItemComponent', () => {
  let component: ScoreboardItemComponent;
  let fixture: ComponentFixture<ScoreboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreboardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
