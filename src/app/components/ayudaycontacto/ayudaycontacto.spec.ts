import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ayudaycontacto } from './ayudaycontacto';

describe('Ayudaycontacto', () => {
  let component: Ayudaycontacto;
  let fixture: ComponentFixture<Ayudaycontacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ayudaycontacto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ayudaycontacto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
