import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ApiAuditoriaService } from 'src/app/services/api-auditoria.service';

@Component({
  selector: 'app-reporte-auditoria',
  templateUrl: './reporte-auditoria.component.html',
  styleUrls: ['./reporte-auditoria.component.css']
})
export class ReporteAuditoriaComponent implements OnInit {
  constructor(private api: ApiAuditoriaService) { }

  // Cargando
  public loading: boolean = false;
  public enviadoresSeleccionados: any = [];
  public clientes: any = [];

  public encuestasObtenidas: any = [];
  public clienteSeleccionado: any;
  public encuestasPorCliente: any = [];

  // Fecha
  public pipe = new DatePipe('en-US');

  // Fecha
  public hoy = new Date();
  public hoyFormated = this.pipe.transform(this.hoy, 'yyyy-MM-dd');
  public fecha_desde: any = '';
  public fecha_hasta: any = '';


  ngOnInit(): void {
    this.getEncuestas();
  }

  getEncuestas() {
    this.api.get(`api/Encuestas_auditoria`)
      .pipe(
        map((result: any) => {
          console.log(result);

          if (result.length > 0) {
            this.encuestasObtenidas = result;
          }

          for (let item of result) {
            let itemCliente = {
              nombre: item.Clientes_auditorium.NOMBRE,
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

    this.fecha_desde = (<HTMLInputElement>document.getElementById('fecha_desde')).value;
    this.fecha_hasta = (<HTMLInputElement>document.getElementById('fecha_hasta')).value;

    if (this.fecha_desde == '') {
      this.fecha_desde = this.hoyFormated;
    }

    if (this.fecha_hasta == '') {
      this.fecha_hasta = this.fecha_desde;
    }

    console.log(this.fecha_desde, this.fecha_hasta);

    let filtroFechas = {
      fecha_desde: this.fecha_desde,
      fecha_hasta: this.fecha_hasta,
    }

    this.api.post('api/Encuestas_auditoriaFecha', filtroFechas)
      .pipe(
        map((data) => {
          console.log(data);
          this.encuestasObtenidas = data;

          console.log('Total de encuestas', this.encuestasObtenidas.length);
        })
      )
      .subscribe();

    // this.api.get(`api/Encuestas_satisfaccion/cedula/${this.clienteSeleccionado}`)
    //   .pipe(
    //     map((result: any) => {
    //       console.log(result);

    //       if (result.length > 0) {
    //         this.encuestasPorCliente = result;

    //         this.encuestasObtenidas = result;
    //       }
    //     })
    //   )
    //   .subscribe({
    //     // next(result: any) {
    //     //   console.log(result);
    //     // },
    //     error(msg) {
    //       alert(
    //         'Error de conexión: ' +
    //         msg.message +
    //         'No se puede verificar el turno'
    //       );
    //       console.log('Error al verificar el turno: ', msg.message);
    //       return;
    //     },
    //   });
  }
}
