import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ayudacontacto } from './ayudacontacto';

describe('Ayudacontacto', () => {
  let component: Ayudacontacto;
  let fixture: ComponentFixture<Ayudacontacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ayudacontacto],
    }).compileComponents();

    fixture = TestBed.createComponent(Ayudacontacto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
