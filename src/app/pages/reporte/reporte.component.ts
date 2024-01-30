import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {
  constructor(private api: ApiService) { }

  // Cargando
  public loading: boolean = false;
  public enviadoresSeleccionados: any = [];
  public clientes: any = [];

  public encuestasObtenidas: any = [];
  public clienteSeleccionado: any;
  public encuestasPorCliente: any = [];


  ngOnInit(): void {
    this.getEncuestas();
  }

  getEncuestas() {
    this.api.get(`api/Encuesta_satisfaccion`)
      .pipe(
        map((result: any) => {
          console.log(result);

          if (result.length > 0) {
            this.encuestasObtenidas = result;
          }

          for (let item of result) {
            let itemCliente = {
              nombre: item.Turnos_satisfaccion.CLIENTE,
              nro_documento: item.pregunta1
            }

            this.clientes.push(itemCliente);
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

  /**
   *
   * Funciones del ngselect
   *
   * */


  addItem(e: any) {
    this.enviadoresSeleccionados.push(e);
    console.log(this.enviadoresSeleccionados);
  }

  deleteItem(e: any) {
    this.enviadoresSeleccionados = this.enviadoresSeleccionados.filter((element: any) => element !== e.value);
    console.log(this.enviadoresSeleccionados);
  }

  deleteAllItems() {
    console.log('clear all items');
    this.enviadoresSeleccionados = [];
  }

  buscar() {
    this.encuestasObtenidas = [];

    console.log('buscar');

    this.api.get(`api/Encuesta_satisfaccion/cedula/${this.clienteSeleccionado}`)
      .pipe(
        map((result: any) => {
          console.log(result);

          if (result.length > 0) {
            this.encuestasPorCliente = result;

            this.encuestasObtenidas = result;
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

}
