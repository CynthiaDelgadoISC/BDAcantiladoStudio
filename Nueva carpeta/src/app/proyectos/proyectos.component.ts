import { BDService } from './../services/bd.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  @Input() state: string = '';
  list: any;
  proyecto: FormGroup;
  proyectoUpdate: FormGroup;
  clientes: any;

  constructor(private bd: BDService) { 
    this.bd.getTabla('cliente').subscribe(resp => {
      this.clientes = resp['results'];
    });
    this.bd.getTabla('proyecto').subscribe(resp => {
      this.list = resp['results'];
    });
  }

  ngOnInit(): void {
    this.proyecto = new FormGroup({
      id                 : new FormControl(),
      nombre             : new FormControl(),
      fecha_inicio       : new FormControl(),
      fecha_entrega      : new FormControl(),
      presupuesto        : new FormControl(),
      ganancia_estimada  : new FormControl(),
      id_cliente         : new FormControl(),
    });
    this.proyectoUpdate= new FormGroup({
      nombre             : new FormControl(),
      fecha_inicio       : new FormControl(),
      fecha_entrega      : new FormControl(),
      presupuesto        : new FormControl(),
      ganancia_estimada  : new FormControl(),
    });

  }

  async onSubmit(data){ 
    
    let resp = 
    await this.bd.insertProyecto(data);

    resp.subscribe(res => {
      if(res['sucess']){
        Swal.fire({
          title: 'Registrado con éxito',
          icon: 'success'
        })
      }else{
        Swal.fire({
          title: 'Ha habido un error',
          icon: 'error'
        })
      }
      console.log(res);
    });
  }

  onDelete(id){
    this.bd.deleteRegistro('proyecto',id).subscribe(resp =>{
      if(resp['sucess']){
        Swal.fire({
          title: 'Eliminación exitosa',
          icon: 'success'
        })
      }else{
        Swal.fire({
          title: 'Ha habido un error',
          icon: 'error'
        })
      }
        
    });
  }

  async onSubmit2(data: Array<String>, id){ 
    console.log(id);

    let flag = false;
    
    
    for(let e in data){
      if(data[e] == null)
      flag=true
    }

    if(flag){
      Swal.fire({
        title: 'No deje campos vacíos',
        icon: 'error'
      })
    }else{
      flag = false;

      await this.bd.updateProyecto(
        id,
        data
      ).toPromise().then(resp =>{flag=(resp['sucess']?true:false)});
      
      
      if(flag){
        Swal.fire({
          title: 'Actualización exitosa',
          icon: 'success'
        })
      }else{
        Swal.fire({
          title: 'Ha habido un error',
          icon: 'error'
        })
      }
    }
  }
}

