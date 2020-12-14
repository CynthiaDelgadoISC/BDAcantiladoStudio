import { BDService } from './../services/bd.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  @Input() state: string = '';
  list: any;
  area: FormGroup;
  areaUpdate: FormGroup;
  

  constructor(private bd: BDService) { 
    
  }

  ngOnInit(): void {
    this.area = new FormGroup({
      id       : new FormControl(),
      nombre   : new FormControl(),
    });
    this.areaUpdate= new FormGroup({
      nombre   : new FormControl(),
    });

    this.bd.getTabla('area').subscribe(resp => {
      this.list = resp['results'];
    });
  }

  async onSubmit(data){ 
    
    let resp = 
    await this.bd.insertArea(data.id,data.nombre);

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
    this.bd.deleteRegistro('area',id).subscribe(resp =>{
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

      await this.bd.updateArea(
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
