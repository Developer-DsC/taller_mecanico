import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { CitaService } from '../../../services/cita.service';

@Component({
  selector: 'app-citas-calendario-cliente',
  templateUrl: './citas-calendario-cliente.component.html',
  styleUrls: ['./citas-calendario-cliente.component.css']
})
export class CitasCalendarioClienteComponent implements OnInit {

  calendarOptions: CalendarOptions | null = null;

  constructor(private citaService: CitaService,
              @Inject(PLATFORM_ID) private platformId: Object) {}

ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    this.calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  events: [],
  displayEventTime: false  // oculta todas las horas
};


    this.citaService.getCitas().subscribe(response => {
      const citasArray = response.data;

      if (this.calendarOptions) {
        this.calendarOptions.events = citasArray.map(cita => ({
          title: 'Ocupado',   // Título fijo para todas las citas
          date: cita.fecha
        }));
      }
    });
  }
}

}
