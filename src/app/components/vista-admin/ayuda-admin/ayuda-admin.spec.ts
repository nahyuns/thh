import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AyudaAdmin } from './ayuda-admin';

describe('AyudaAdmin', () => {
  let component: AyudaAdmin;
  let fixture: ComponentFixture<AyudaAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AyudaAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(AyudaAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
