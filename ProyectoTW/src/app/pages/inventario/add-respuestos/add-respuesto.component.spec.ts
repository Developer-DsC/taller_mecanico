import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRespuestoComponent } from '../../inventario/add-respuestos/add-respuesto.component';

describe('AddRespuestoComponent', () => {
  let component: AddRespuestoComponent;
  let fixture: ComponentFixture<AddRespuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRespuestoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRespuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
