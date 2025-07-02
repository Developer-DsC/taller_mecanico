import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturaPdfComponent } from './factura-pdf.component';

describe('FacturaPdfComponent', () => {
  let component: FacturaPdfComponent;
  let fixture: ComponentFixture<FacturaPdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FacturaPdfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturaPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
