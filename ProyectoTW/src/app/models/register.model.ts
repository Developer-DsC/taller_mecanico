
export class Register {
  nombre: string;
  email: string;
  password_hash: string;
  rol:string;

  constructor(
    nombre: string,
    email: string,
    password_hash: string,
    rol:string,

  ) {
    this.nombre = nombre;
    this.email = email;
    this.password_hash = password_hash;
    this.rol=rol;

  }
}
