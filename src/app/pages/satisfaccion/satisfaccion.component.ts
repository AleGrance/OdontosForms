import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
// Importar la API
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs';

// Para obtener los parametros de la url
import { ActivatedRoute } from '@angular/router';
import { ApiSatisfaccionService } from 'src/app/services/api-satisfaccion.service';


@Component({
  selector: 'app-satisfaccion',
  templateUrl: './satisfaccion.component.html',
  styleUrls: ['./satisfaccion.component.css']
})
export class SatisfaccionComponent implements OnInit {
  constructor(private toastr: ToastrService, private route: ActivatedRoute, private api: ApiSatisfaccionService, private router: Router) { }

  public encuestaForm: any;
  public codTurno: any
  public preg1: any
  public preg2: any
  public preg3: any
  public preg4: any
  public preg5: any
  public preg6: any
  public preg7: any
  public preg8: any
  public preg9: any
  public preg10: any
  public preg11: any

  // Tiene ruc SI/NO
  public hasRuc: boolean = false;

  // Tiene sugerencia SI/NO
  public hasSugeren: boolean = false;

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
    this.api.get(`api/Encuestas_satisfaccion/${this.codTurno}`)
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
      pregunta1: this.preg1,
      pregunta2: this.preg2,
      pregunta3: this.preg3,
      pregunta4: this.preg4,
      pregunta5: this.preg5,
      pregunta6: this.preg6,
      pregunta7: this.preg7,
      pregunta8: this.preg8,
      pregunta9: this.hasSugeren ? ((<HTMLInputElement>document.getElementById("sugerencia")).value) : 'NO',
      pregunta10: this.preg10,
      pregunta11: this.preg11,

      COD_TURNO: this.codTurno,
      user_id: 1
    }

    console.log(objEncuesta);

    this.api.post('api/Encuestas_satisfaccion', objEncuesta)
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
