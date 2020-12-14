import { BDService } from './../services/bd.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {
  @Input() state: string = '';
  list: any;
  equipo: FormGroup;
  equipoUpdate: FormGroup;
  clientes: any;
 
  constructor(private bd: BDService) { 
    this.bd.getTabla('Equipo_de_computo').subscribe(resp => {
      this.list = resp['results'];
    });
  }

  ngOnInit(): void {
    this.equipo = new FormGroup({
      id                 : new FormControl(),
      tipo               : new FormControl(),
      costo              : new FormControl(),
      marca              : new FormControl(),   
    });
    this.equipoUpdate= new FormGroup({
      tipo               : new FormControl(),
      costo              : new FormControl(),
      marca              : new FormControl(),
    });

  }

  async onSubmit(data){ 
    
    let resp = 
    await this.bd.insertEquipo(data);

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
    this.bd.deleteRegistro('equipo_de_computo',id).subscribe(resp =>{
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

      await this.bd.updateEquipo(
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
