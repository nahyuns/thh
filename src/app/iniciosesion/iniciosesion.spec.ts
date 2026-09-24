import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Iniciosesion } from './iniciosesion';

describe('Iniciosesion', () => {
  let component: Iniciosesion;
  let fixture: ComponentFixture<Iniciosesion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Iniciosesion],
    }).compileComponents();

    fixture = TestBed.createComponent(Iniciosesion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
