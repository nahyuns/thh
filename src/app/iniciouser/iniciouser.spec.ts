import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Iniciouser } from './iniciouser';

describe('Iniciouser', () => {
  let component: Iniciouser;
  let fixture: ComponentFixture<Iniciouser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Iniciouser],
    }).compileComponents();

    fixture = TestBed.createComponent(Iniciouser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
