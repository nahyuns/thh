import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlojamientosAdmin } from './alojamientos-admin';

describe('AlojamientosAdmin', () => {
  let component: AlojamientosAdmin;
  let fixture: ComponentFixture<AlojamientosAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlojamientosAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(AlojamientosAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
