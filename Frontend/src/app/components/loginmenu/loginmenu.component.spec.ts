import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMenuComponent } from './loginmenu.component';

describe('LoginMenuComponent', () => {
  let component: LoginMenuComponent;
  let fixture: ComponentFixture<LoginMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
