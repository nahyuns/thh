import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Bosque } from './bosque';

describe('Bosque', () => {
  let component: Bosque;
  let fixture: ComponentFixture<Bosque>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bosque],
    }).compileComponents();

    fixture = TestBed.createComponent(Bosque);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
