import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoixRoleComponent } from './choix-role.component';

describe('ChoixRoleComponent', () => {
  let component: ChoixRoleComponent;
  let fixture: ComponentFixture<ChoixRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoixRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
