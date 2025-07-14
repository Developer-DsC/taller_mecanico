import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCitaDialogComponent } from './detalle-cita-dialog.component';

describe('DetalleCitaDialogComponent', () => {
  let component: DetalleCitaDialogComponent;
  let fixture: ComponentFixture<DetalleCitaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleCitaDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleCitaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
