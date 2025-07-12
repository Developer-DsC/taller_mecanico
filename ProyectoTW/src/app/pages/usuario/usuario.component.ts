import { Component, OnInit } from '@angular/core';
import { Usuario, UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, switchMap } from 'rxjs';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']  // ← corrigido
})
export class UsuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  filtroNombre$ = new BehaviorSubject<string>(''); // texto de búsqueda
  usuarioFiltrados$!: Observable<Usuario[]>; // observable filtrado

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(data=>{
      this.usuarios = data;

      this.usuarioFiltrados$ = this.filtroNombre$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((nombre) =>
        new Observable<Usuario[]>(observer => {
          const resultado = this.usuarios.filter(u =>
            u.nombre.toLowerCase().includes(nombre.toLowerCase())
          );
          observer.next(resultado);
          observer.complete();
        })
    )
      );
      this.filtroNombre$.next(''); // muestra todo al inicio
    });
  }




  onBuscar(event: Event): void {
  const valor = (event.target as HTMLInputElement).value;
  this.filtroNombre$.next(valor);
}

  obtenerUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      data => {
        
        this.usuarios = data;
      },
      error => console.error('Error al obtener usuarios:', error)
    );
  }
eliminar(usuario_id: number) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      this.usuarioService.deleteUsuario(usuario_id).subscribe({
        next: () => {
          this.usuarios = this.usuarios.filter(u => u.usuario_id !== usuario_id);
          Swal.fire('Eliminado', 'Usuario eliminado correctamente.', 'success');
        },
        error: (errorData) => {
          console.error(errorData);
          Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
        }
      });
    }
  });
}
}