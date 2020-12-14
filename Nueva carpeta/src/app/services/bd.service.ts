import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BDService {
  
  baseUrl = 'http://localhost:3000/';
  constructor(private http: HttpClient) { }
  
  async insertCliente(data): Promise<Observable<Object>> { 
    let id_dir = '';
    await this.insertDireccion(data.calle,data.fraccionamiento,data.numero.toString(),data.ciudad).toPromise().then(resp => {
      id_dir = resp['resultados'].insertId;
    });
    let body = new HttpParams()
      .set("tabla", "cliente")
      .set('id', data.id)
      .set('nombre',data.nombre)
      .set('tel',data.telefono)
      .set('id_dir',id_dir);
      return this.http.post(this.baseUrl+"insertCliente", body.toString(),{
        headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
      });
  }
  updateCliente(id: string, nombre: string, telefono: string){
    const body = new HttpParams()
    .set('id',id)
    .set('nombre',nombre)
    .set('telefono',telefono);

    return this.http.post(this.baseUrl+"updateCliente", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  getDireccion(dir){
    const body = new HttpParams()
    .set('id',dir);
    return this.http.post(this.baseUrl+"getDireccion", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  updateDireccion(dir,calle,fraccionamiento,numero,ciudad){
    console.log('direccion->>>'+dir);
    const body = new HttpParams()
    .set('did',dir)
    .set('calle',calle)
    .set('fraccionamiento',fraccionamiento)
    .set('numero',numero)
    .set('ciudad',ciudad);
    return this.http.post(this.baseUrl+"updateDireccion", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }


  getTabla(tabla:string){
    const body = new HttpParams()
    .set('tabla',tabla);
    return this.http.post(this.baseUrl+"getTabla", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  
  insertRegistro(tabla:string ){
    let body = new HttpParams()
    .set("tabla", tabla)
    .set('id', 'M1')
    .set('nombre','apis')
    .set('tipo','no enitnedo')
    .set('id_pro','001')
    return this.http.post(this.baseUrl+"insertRegistro", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  insertDireccion(calle: string, fracc: string, num: string, cd: string){
    let body = new HttpParams()
    .set("tabla", "direccion")
    .set('calle',calle)
    .set('fracc',fracc)
    .set('numero',num)
    .set('cd',cd)
    return this.http.post(this.baseUrl+"insertDireccion", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  insertProyecto(data){
    let body = new HttpParams()
    .set("tabla", "proyecto")
    .set('id', data.id)
    .set('nombre',data.nombre)
    .set('finicio',data.fecha_inicio)
    .set('fentrega',data.fecha_entrega)
    .set('presupuesto',data.presupuesto)
    .set('ganancia',data.ganancia_estimada)
    .set('id_cliente',data.id_cliente);
    return this.http.post(this.baseUrl+"insertProyecto", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  updateProyecto(id: string, data){
    const body = new HttpParams()
    .set('id',id)
    .set('nombre',data.nombre)
    .set('fecha_inicio',data.fecha_inicio)
    .set('fecha_entrega',data.fecha_entrega)
    .set('presupuesto',data.presupuesto)
    .set('ganancia_estimada',data.ganancia_estimada);

    return this.http.post(this.baseUrl+"updateProyecto", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  
  async insertLider(data){
    let id_dir = '';
    await this.insertDireccion(data.calle,data.fraccionamiento,data.numero.toString(),data.ciudad).toPromise().then(resp => {
      id_dir = resp['resultados'].insertId;
    });
    let body = new HttpParams()
    .set("tabla", "lider")
    .set('id', data.id)
    .set('nombre',data.nombre)
    .set('prima',data.primApe)
    .set('sega',data.segApe)
    .set('sueldo',data.sueldo)
    .set('tel',data.telefono)
    .set('horario',data.horario)
    .set('id_dir',id_dir)
    return this.http.post(this.baseUrl+"insertLider", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  
  }
  updateLider(data, id){
    let body = new HttpParams()
    .set('id', id)
    .set('nombre',data.nombre)
    .set('prima',data.primApe)
    .set('sega',data.segApe)
    .set('sueldo',data.sueldo)
    .set('tel',data.telefono)
    .set('horario',data.horario)
    return this.http.post(this.baseUrl+"updateLider", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  async insertEmpleado(data){
    let id_dir = '';
    await this.insertDireccion(data.calle,data.fraccionamiento,data.numero.toString(),data.ciudad).toPromise().then(resp => {
      id_dir = resp['resultados'].insertId;
    });
    console.log(data);
    let body = new HttpParams()
    .set("tabla", "empleado")
    .set('id', data.id)
    .set('nombre',data.nombre)
    .set('prima',data.primApe)
    .set('sega',data.segApe)
    .set('sueldo',data.sueldo)
    .set('tel',data.telefono)
    .set('horario',data.horario)
    .set('id_dir',id_dir)
    .set('id_area',data.area)
    .set('id_eq',data.equipo)
    .set('id_lider',data.lider)
    return this.http.post(this.baseUrl+"insertEmpleado", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  updateEmpleado(data, id){
    let body = new HttpParams()
    .set('id', id)
    .set('nombre',data.nombre)
    .set('prima',data.primApe)
    .set('sega',data.segApe)
    .set('sueldo',data.sueldo)
    .set('tel',data.telefono)
    .set('horario',data.horario)
    return this.http.post(this.baseUrl+"updateEmpleado", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  insertArea(id, nombre){
    let body = new HttpParams()
    .set('id', id)
    .set('nombre',nombre)
    return this.http.post(this.baseUrl+"insertArea", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
  updateArea(id, data){
    let body = new HttpParams()
    .set('id', id)
    .set('nombre',data.nombre)
    return this.http.post(this.baseUrl+"updateArea", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  insertEquipo(data){
    let body = new HttpParams()
    .set("tabla", "equipo_de_computo")
    .set('id', data.id)
    .set('tipo',data.tipo)
    .set('costo',data.costo)
    .set('marca',data.marca)
    return this.http.post(this.baseUrl+"insertEquipo", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  updateEquipo(data, id){
    console.log(id,data);
    let body = new HttpParams()
    .set('id', id)
    .set('tipo',data.tipo)
    .set('costo',data.costo)
    .set('marca',data.marca)
    return this.http.post(this.baseUrl+"updateEquipo", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  insertModulo(data){
    let body = new HttpParams()
    .set("tabla", "Modulo")
    .set('id', data.id)
    .set('nombre',data.nombre)
    .set('tipo',data.tipo)
    .set('id_proyecto',data.id_proyecto)
    return this.http.post(this.baseUrl+"insertModulo", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  updateModulo(data, id){
    console.log(id,data);
    let body = new HttpParams()
    .set('id', id)
    .set('nombre',data.nombre)
    .set('tipo',data.tipo)
    return this.http.post(this.baseUrl+"updateModulo", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  insertProveedor(data){
    let body = new HttpParams()
    .set("tabla", "Proveedor")
    .set('id', data.id)
    .set('nombre',data.nombre)
    .set('sitio_web',data.sitio_web)
    .set('descripcion',data.descripcion)
    .set('id_proyecto',data.id_proyecto)
    return this.http.post(this.baseUrl+"insertProveedor", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }

  updateProveedor(data, id){
    console.log(id,data);
    let body = new HttpParams()
    .set('id', id)
    .set('nombre',data.nombre)
    .set('sitio_web',data.sitio_web)
    .set('descripcion',data.descripcion)
    return this.http.post(this.baseUrl+"updateProveedor", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }



  deleteRegistro(tabla:string, id:string){
    let body= new HttpParams()
    .set("tabla", tabla)
    .set('id', id);
    return this.http.post(this.baseUrl+"deleteRegistro", body.toString(),{
      headers: new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    });
  }
}
