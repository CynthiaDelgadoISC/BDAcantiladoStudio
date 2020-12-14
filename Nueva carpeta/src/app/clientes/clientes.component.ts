import { BDService } from './../services/bd.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  @Input() state: string = '';
  @Input() list: any;
  cliente: FormGroup;
  clienteUpdate: FormGroup;
  direccion: FormGroup;
  clientes: any;
  constructor(private bd: BDService) { }

  ngOnInit(): void {
    this.cliente = new FormGroup({
      id                 : new FormControl(),
      nombre             : new FormControl(),
      telefono           : new FormControl(),
      calle              : new FormControl(),
      fraccionamiento    : new FormControl(),
      numero             : new FormControl(),
      ciudad             : new FormControl(),
    });
    this.clienteUpdate= new FormGroup({
      nombre             : new FormControl(),
      telefono           : new FormControl(),
      calle              : new FormControl(),
      fraccionamiento    : new FormControl(),
      numero             : new FormControl(),
      ciudad             : new FormControl(),
    });

  }

  async onSubmit(data){ 
    
    let resp = 
    await this.bd.insertCliente(data);

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
    this.bd.deleteRegistro('cliente',id).subscribe(resp =>{
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

  async onSubmit2(data: Array<String>, id, id_dir){ 
    console.log(data);

    let flag = false;
    let flag2 = false;
    
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

      await this.bd.updateCliente(
        id,
        data['nombre'],
        data['telefono'],
      ).toPromise().then(resp =>{flag=(resp['sucess']?true:false)});
      await this.bd.updateDireccion(
        id_dir,
        data['calle'],
        data['fraccionamiento'],
        data['numero'],
        data['ciudad'],
      ).toPromise().then(resp =>{flag2=(resp['sucess']?true:false)});
      
      if(flag && flag2){
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

    /*let resp = 
    await this.bd.insertCliente(data);

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
    });*/
  }
}
