import { BDService } from './../services/bd.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  @Input() state: string = '';
  list: any;
  proveedor: FormGroup;
  proveedorUpdate: FormGroup;
  proyectos: any;

  constructor(private bd: BDService) { 
    this.bd.getTabla('proveedor').subscribe(resp => {
      this.list = resp['results'];
    });
    this.bd.getTabla('proyecto').subscribe(resp => {
      this.proyectos = resp['results'];
    });
  }

  ngOnInit(): void {
    this.proveedor = new FormGroup({
      id                 : new FormControl(),
      nombre             : new FormControl(),
      sitio_web          : new FormControl(),
      descripcion        : new FormControl(),
      id_proyecto        : new FormControl(),
    });
    this.proveedorUpdate= new FormGroup({
      nombre             : new FormControl(),
      sitio_web          : new FormControl(),
      descripcion        : new FormControl(),
    });

  }

  async onSubmit(data){ 
    
    let resp = 
    await this.bd.insertProveedor(data);

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
    this.bd.deleteRegistro('Proveedor',id).subscribe(resp =>{
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

      await this.bd.updateProveedor(
        data,
        id
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
