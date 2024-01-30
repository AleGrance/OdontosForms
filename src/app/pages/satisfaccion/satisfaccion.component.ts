import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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
  constructor(private toastr: ToastrService, private route: ActivatedRoute, private api: ApiService, private router: Router) { }

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
  // public preg13: any
  // public preg14: any
  // public preg15: any
  // public preg16: any
  public preg17: any
  public preg18: any
  public preg19: any
  public preg20: any

  ngOnInit(): void {
    // Se obtiene el parametro cod_turno de la URL
    this.codTurno = this.route.snapshot.paramMap.get('codtrn');

    //console.log(parseInt(this.codTurno));

    // Check si el turno ya tiene una encuesta guardad
    if (this.codTurno) {
      this.checkTurnoEncuesta();
    }

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
            this.router.navigate(['/agradecimiento']);
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
    console.log('POST');

    const objEncuesta = {
      pregunta1: ((<HTMLInputElement>document.getElementById("cedula")).value),
      pregunta2: ((<HTMLInputElement>document.getElementById("ruc")).value),
      pregunta3: ((<HTMLInputElement>document.getElementById("email")).value),
      pregunta4: this.preg4,
      pregunta5: this.preg5,
      pregunta6: this.preg6,
      pregunta7: this.preg7,
      pregunta8: this.preg8,
      pregunta9: this.preg9,
      pregunta10: this.preg10,
      pregunta11: this.preg11,
      pregunta12: this.preg12,
      pregunta13: ((<HTMLInputElement>document.getElementById("domicilio")).value),
      pregunta14: ((<HTMLInputElement>document.getElementById("barrio")).value),
      pregunta15: ((<HTMLInputElement>document.getElementById("ciudad")).value),
      pregunta16: ((<HTMLInputElement>document.getElementById("contacto")).value),
      pregunta17: this.preg17,
      pregunta18: this.preg18,
      pregunta19: this.preg19,
      pregunta20: this.preg20,

      COD_TURNO: this.codTurno,
      user_id: 1
    }

    console.log(objEncuesta);

    this.api.post('api/Encuesta_satisfaccion', objEncuesta)
      .subscribe(
        (data) => {
          // Manejar la respuesta exitosa aquí
          console.log('Respuesta del servidor:', data);

          let result: any = data;

          if (result.status === 'success') {
            this.toastr.success('Encuesta registrada correctamente.', 'Gracias!');
            this.router.navigate(['/agradecimiento']);
          }

          if (result.status === 'error') {
            this.toastr.error(result.body[0].message, 'Error');
            //console.log('Error', result);
          }
        },
        (error) => {
          // Manejar el error aquí
          console.error('Error en la solicitud POST:', error);
          this.toastr.error(error.message, `Server ERROR: ${error.status}`);
        }
      );
  }

  enviarDatos() {
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
