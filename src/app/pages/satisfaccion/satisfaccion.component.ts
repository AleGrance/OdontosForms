import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// Importar la API
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs';

// Para obtener los parametros de la url
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-satisfaccion',
  templateUrl: './satisfaccion.component.html',
  styleUrls: ['./satisfaccion.component.css']
})
export class SatisfaccionComponent implements OnInit {
  constructor(private toastr: ToastrService, private route: ActivatedRoute, private api: ApiService) { }

  public encuestaForm: any;
  public codTurno: any
  public preg4: any
  public preg5: any
  public preg6: any
  public preg7: any
  public preg8: any
  public preg9: any
  public preg10: any
  public preg11: any
  public preg12: any
  public preg13: any
  public preg14: any
  public preg15: any
  public preg16: any
  public preg17: any
  public preg18: any
  public preg19: any
  public preg20: any

  ngOnInit(): void {
    // Se obtiene el parametro cod_turno de la URL
    this.codTurno = this.route.snapshot.paramMap.get('codtrn');

    console.log(parseInt(this.codTurno));

    // Check si el turno ya tiene una encuesta guardad
    this.checkTurnoEncuesta()

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

  checkTurnoEncuesta() {
    this.api.get(`api/Encuesta_satisfaccion/${this.codTurno}`)
      .pipe(
        map((result: any) => {
          console.log(result);

          if (result.length > 0) {
            this.toastr.warning('Ya existe una encuesta cargada por el turno seleccionado.', 'Encuesta ya registrada.');
          }
        })
      )
      .subscribe({
        // next(result: any) {
        //   console.log(result);
        // },
        error(msg) {
          alert(
            'Error de conexión: ' +
            msg.message +
            'No se puede verificar el turno'
          );
          console.log('Error al verificar el turno: ', msg.message);
          return;
        },
      });
  }

  // Validaciones
  get cedula() { return this.encuestaForm.get('cedula'); };
  get ruc() { return this.encuestaForm.get('ruc'); };
  get email() { return this.encuestaForm.get('email'); };

  submit() {
    //this.toastr.success('Datos guardados!', 'Listo!');

    const objEncuesta = {
      p1: ((<HTMLInputElement>document.getElementById("cedula")).value),
      p2: ((<HTMLInputElement>document.getElementById("ruc")).value),
      p3: ((<HTMLInputElement>document.getElementById("email")).value),
      p4: this.preg4,
      p5: this.preg5,
      p6: this.preg6,
      p7: this.preg7,
      p8: this.preg8,
      p9: this.preg9,
      p10: this.preg10,
      //  p11  ((<HTMLInputElement>document.getElementById("ruc")).value);
      //  p12  ((<HTMLInputElement>document.getElementById("ruc")).value);
      //  p13  ((<HTMLInputElement>document.getElementById("ruc")).value);
      //  p14  ((<HTMLInputElement>document.getElementById("ruc")).value);
      //  p15  ((<HTMLInputElement>document.getElementById("ruc")).value);
      //  p16  ((<HTMLInputElement>document.getElementById("ruc")).value);
      //  p17  ((<HTMLInputElement>document.getElementById("ruc")).value);
      //  p18  ((<HTMLInputElement>document.getElementById("ruc")).value);
      //  p19  ((<HTMLInputElement>document.getElementById("ruc")).value);
      //  p20  ((<HTMLInputElement>document.getElementById("ruc")).value);
    }

    console.log(objEncuesta);
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
