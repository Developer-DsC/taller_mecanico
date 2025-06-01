import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServicioContradoComponent } from './add-servicio-contrado.component';

describe('AddServicioContradoComponent', () => {
  let component: AddServicioContradoComponent;
  let fixture: ComponentFixture<AddServicioContradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddServicioContradoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServicioContradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
