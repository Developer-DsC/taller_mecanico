import { Component } from '@angular/core';
import { Usuario, UsuarioService } from '../../services/usuario.service';
import { AlertService } from '../../services/aler.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']  // ← corrigido
})
export class UsuarioComponent {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      data => {
        console.log('Llegaron estos usuarios');
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
          next: (data) => {
            console.log(data);
          },
          error: (errorData) => {
            console.error(errorData);
          },
          complete: () => {
            console.log('completo');
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          },
        });
      } else {
        Swal.fire({
          title: 'Cancelado',
          text: 'La acción de eliminación ha sido cancelada.',
          icon: 'info',
          confirmButtonText: 'Aceptar',
        }).then(() => {
          console.log('Eliminación cancelada');
        });
      }
    });
  }
}
