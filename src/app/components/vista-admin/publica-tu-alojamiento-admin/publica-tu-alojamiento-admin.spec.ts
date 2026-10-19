import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicaTuAlojamientoAdmin } from './publica-tu-alojamiento-admin';

describe('PublicaTuAlojamientoAdmin', () => {
  let component: PublicaTuAlojamientoAdmin;
  let fixture: ComponentFixture<PublicaTuAlojamientoAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicaTuAlojamientoAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicaTuAlojamientoAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
