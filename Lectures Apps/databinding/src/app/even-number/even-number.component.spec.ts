import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenNumberComponent } from './even-number.component';

describe('EvenNumberComponent', () => {
  let component: EvenNumberComponent;
  let fixture: ComponentFixture<EvenNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
