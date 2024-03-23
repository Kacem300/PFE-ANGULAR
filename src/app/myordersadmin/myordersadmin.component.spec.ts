import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyordersadminComponent } from './myordersadmin.component';

describe('MyordersadminComponent', () => {
  let component: MyordersadminComponent;
  let fixture: ComponentFixture<MyordersadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyordersadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyordersadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
