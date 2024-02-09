import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { ApiSatisfaccionService } from 'src/app/services/api-satisfaccion.service';

@Component({
  selector: 'app-reporte-satisfaccion',
  templateUrl: './reporte-satisfaccion.component.html',
  styleUrls: ['./reporte-satisfaccion.component.css']
})
export class ReporteSatisfaccionComponent implements OnInit {
  constructor(private api: ApiSatisfaccionService) { }

  // Cargando
  public loading: boolean = false;
  public enviadoresSeleccionados: any = [];

  public clientes: any = [];
  public clienteSeleccionado: any;

  public sucursales: any = [];
  public sucursalSeleccionada: any;

  public carnets: any = [];
  public carnetSeleccionado: any;

  public encuestasObtenidas: any = [];
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
    this.api.get(`api/Encuestas_satisfaccion`)
      .pipe(
        map((result: any) => {
          console.log(result);

          if (result.length > 0) {
            this.encuestasObtenidas = result;
          }

          // Llenar selects
          this.llenarSelects(result);


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

  llenarSelects(result: any) {
    this.clientes = [];
    this.sucursales = [];
    this.carnets = [];

    for (let item of result) {
      let itemCliente = {
        nombre: item.Turnos_satisfaccion.CLIENTE,
      }

      this.clientes.push(itemCliente);
    }

    // Llenar lista de sucursales
    for (let item of result) {
      let itemSucursal = item.Turnos_satisfaccion.SUCURSAL

      if (!this.sucursales.includes(itemSucursal)) {
        this.sucursales.push(itemSucursal);
      }
    }

    // Llenar lista de carnets
    for (let item of result) {
      let itemCarnet = item.Turnos_satisfaccion.NRO_CERT

      if (!this.carnets.includes(itemCarnet)) {
        this.carnets.push(itemCarnet);
      }
    }
  }


  buscar() {
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

    this.api.post('api/Encuestas_satisfaccionFecha', filtroFechas)
      .pipe(
        map((data) => {
          console.log(data);
          this.encuestasObtenidas = data;

          console.log('Total de encuestas', this.encuestasObtenidas.length);

          // Llenar selects
          this.llenarSelects(data);
        })
      )
      .subscribe();

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



  // Evento Clear
  clearResetTable() {
    console.log('CLEAR RESET TABLE');
    this.getEncuestas();
  }

  // Eventos change
  changeClientes() {
    console.log('CHANGE CLIENTES');

    console.log(this.clienteSeleccionado);

    let encuestasFiltradas = [];

    for (let item of this.encuestasObtenidas) {
      if (item.Turnos_satisfaccion.CLIENTE == this.clienteSeleccionado) {
        encuestasFiltradas.push(item);
      }
    }

    this.encuestasObtenidas = encuestasFiltradas;

    // Llenar selects
    this.llenarSelects(encuestasFiltradas);
  }

  changeSucursales() {
    console.log('CHANGE SUCURSALES');

    console.log(this.sucursalSeleccionada);

    let encuestasFiltradas = [];

    for (let item of this.encuestasObtenidas) {
      if (item.Turnos_satisfaccion.SUCURSAL == this.sucursalSeleccionada) {
        encuestasFiltradas.push(item);
      }
    }

    this.encuestasObtenidas = encuestasFiltradas;

    // Llenar selects
    this.llenarSelects(encuestasFiltradas);
  }

  // Eventos change
  changeCarnets() {
    console.log('CHANGE CARNETS');

    console.log(this.carnetSeleccionado);

    let encuestasFiltradas = [];

    for (let item of this.encuestasObtenidas) {
      if (item.Turnos_satisfaccion.NRO_CERT == this.carnetSeleccionado) {
        encuestasFiltradas.push(item);
      }
    }

    this.encuestasObtenidas = encuestasFiltradas;

    // Llenar selects
    this.llenarSelects(encuestasFiltradas);
  }
}
