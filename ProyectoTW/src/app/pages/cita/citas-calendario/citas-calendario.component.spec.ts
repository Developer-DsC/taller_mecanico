import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasCalendarioComponent } from './citas-calendario.component';

describe('CitasCalendarioComponent', () => {
  let component: CitasCalendarioComponent;
  let fixture: ComponentFixture<CitasCalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitasCalendarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitasCalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
