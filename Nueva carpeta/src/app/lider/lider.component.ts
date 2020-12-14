import { BDService } from './../services/bd.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lider',
  templateUrl: './lider.component.html',
  styleUrls: ['./lider.component.css']
})
export class LiderComponent implements OnInit {
 
  @Input() state: string = '';
  @Input() list: any;
  lider: FormGroup;
  liderUpdate: FormGroup;
  direccion: FormGroup;
  clientes: any;
  constructor(private bd: BDService) { }

  ngOnInit(): void {
    this.lider = new FormGroup({
      id                 : new FormControl(),
      nombre             : new FormControl(),
      primApe            : new FormControl(),
      segApe             : new FormControl(),
      sueldo             : new FormControl(),
      telefono           : new FormControl(),
      horario            : new FormControl(),
      calle              : new FormControl(),
      fraccionamiento    : new FormControl(),
      numero             : new FormControl(),
      ciudad             : new FormControl(),
    });
    this.liderUpdate = new FormGroup({
      nombre             : new FormControl(),
      primApe            : new FormControl(),
      segApe             : new FormControl(),
      sueldo             : new FormControl(),
      telefono           : new FormControl(),
      horario            : new FormControl(),
      calle              : new FormControl(),
      fraccionamiento    : new FormControl(),
      numero             : new FormControl(),
      ciudad             : new FormControl(),
    });
  }

  async onSubmit(data){ 
    
    let resp = 
    await this.bd.insertLider(data);

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
    this.bd.deleteRegistro('lider',id).subscribe(resp =>{
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

      await this.bd.updateLider(
        data,
        id
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
  }

}
