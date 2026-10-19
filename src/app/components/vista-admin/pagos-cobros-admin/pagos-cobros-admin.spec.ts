import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagosCobrosAdmin } from './pagos-cobros-admin';

describe('PagosCobrosAdmin', () => {
  let component: PagosCobrosAdmin;
  let fixture: ComponentFixture<PagosCobrosAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagosCobrosAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(PagosCobrosAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
