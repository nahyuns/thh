import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicaTuAlojamiento } from './publica-tu-alojamiento';

describe('PublicaTuAlojamiento', () => {
  let component: PublicaTuAlojamiento;
  let fixture: ComponentFixture<PublicaTuAlojamiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicaTuAlojamiento],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicaTuAlojamiento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
