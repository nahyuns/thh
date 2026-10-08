import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Montana } from './montana';

describe('Montana', () => {
  let component: Montana;
  let fixture: ComponentFixture<Montana>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Montana],
    }).compileComponents();

    fixture = TestBed.createComponent(Montana);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
