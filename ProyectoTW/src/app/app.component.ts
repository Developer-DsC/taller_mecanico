import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import {
  trigger,
  transition,
  style,
  query,
  group,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routeAnimations', [
      transition((fromState, toState) => {
        if (!fromState || !toState) return false;
        return Number(fromState) < Number(toState);
      }, [
        // Animación cuando se navega hacia rutas con índice mayor (izquierda -> derecha)
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '100%', opacity: 0 })]),
        query(':leave', [style({ left: '0%', opacity: 1 })]),
        group([
          query(':leave', [animate('300ms ease-out', style({ left: '-100%', opacity: 0 }))]),
          query(':enter', [animate('300ms ease-out', style({ left: '0%', opacity: 1 }))]),
        ]),
      ]),
      transition((fromState, toState) => {
        if (!fromState || !toState) return false;
        return Number(fromState) > Number(toState);
      }, [
        // Animación cuando se navega hacia rutas con índice menor (derecha -> izquierda)
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
          }),
        ]),
        query(':enter', [style({ left: '-100%', opacity: 0 })]),
        query(':leave', [style({ left: '0%', opacity: 1 })]),
        group([
          query(':leave', [animate('300ms ease-out', style({ left: '100%', opacity: 0 }))]),
          query(':enter', [animate('300ms ease-out', style({ left: '0%', opacity: 1 }))]),
        ]),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'spa';
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['index'];
  }
}
