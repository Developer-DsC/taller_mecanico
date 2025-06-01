export class Login {
    public email:string;
    public password_hash:string;

    constructor(email:string,password_hash:string){
        this.email=email;
        this.password_hash=password_hash;
    }
}
