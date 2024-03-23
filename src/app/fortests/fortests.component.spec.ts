import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FortestsComponent } from './fortests.component';

describe('FortestsComponent', () => {
  let component: FortestsComponent;
  let fixture: ComponentFixture<FortestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FortestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FortestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
