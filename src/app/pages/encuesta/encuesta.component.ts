import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  constructor(private toastr: ToastrService) {}

  public encuestaForm: any;

  ngOnInit(): void {
    this.encuestaForm = new FormGroup({
      cedula: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),

      ruc: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),

      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.minLength(6)
      ])
    })
  }

  // Validaciones
  get cedula() { return this.encuestaForm.get('cedula'); };
  get ruc() { return this.encuestaForm.get('ruc'); };
  get email() { return this.encuestaForm.get('email'); };

  submit() {
    this.toastr.success('Datos guardados!', 'Listo!');

    const cedula = ((<HTMLInputElement>document.getElementById("cedula")).value);
    const ruc = ((<HTMLInputElement>document.getElementById("ruc")).value);
  }

  planSeleccionado(e: any) {
    console.log(e);
  }

  enviarDatos() {
    // NRO CI
    let numeroCedula = document.getElementById('cedula');
    console.log('Enviar datos!');
    console.log('Cedula:');
  }

  onCheckAgendar(event: any) {
    console.log(event.target.checked);
    // if (event.target.checked) {
    //   window.open("https://wa.me/+214129000?text=Hola!%20quiero%20agendar%20un%20turno", "_blank");
    // }
  }
}
