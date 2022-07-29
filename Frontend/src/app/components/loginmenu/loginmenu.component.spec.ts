import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginmenuComponent } from './loginmenu.component';

describe('LoginmenuComponent', () => {
  let component: LoginmenuComponent;
  let fixture: ComponentFixture<LoginmenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginmenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
