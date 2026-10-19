import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Playa } from './playa';

describe('Playa', () => {
  let component: Playa;
  let fixture: ComponentFixture<Playa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Playa],
    }).compileComponents();

    fixture = TestBed.createComponent(Playa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
