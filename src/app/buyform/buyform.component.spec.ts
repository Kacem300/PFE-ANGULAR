import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyformComponent } from './buyform.component';

describe('BuyformComponent', () => {
  let component: BuyformComponent;
  let fixture: ComponentFixture<BuyformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyformComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuyformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
