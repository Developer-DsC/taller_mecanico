import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioContratadoComponent } from './servicio-contratado.component';

describe('ServicioContratadoComponent', () => {
  let component: ServicioContratadoComponent;
  let fixture: ComponentFixture<ServicioContratadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicioContratadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioContratadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
