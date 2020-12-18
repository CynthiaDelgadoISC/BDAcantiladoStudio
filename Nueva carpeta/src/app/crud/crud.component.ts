import { BDService } from './../services/bd.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  state: String = '';
  table: String = '';
  list: Array<String>;
  list2: Array<String>;
  list3: Array<String>;
  directionList: Array<String>;
  constructor(private bd: BDService, private route : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  goto(){
    this.router.navigate(['reportes']);
  }

  async setState(state: String, table: String){
    this.state = state;
    this.table = table;

    if(this.table == "cliente"){
     await this.bd.getTabla(this.table.toString()).toPromise().then( (resp) => {
       console.log(resp);
       
       let i = 0;
        resp['results'].map(async element =>{
          await this.bd.getDireccion(element['id_direccion']).toPromise().then(resp2 => {
            resp['results'][i]['calle']  = resp2['results'][0]['calle'];
            resp['results'][i]['fraccionamiento']  = resp2['results'][0]['fraccionamiento'];
            resp['results'][i]['numero']  = resp2['results'][0]['numero'];
            resp['results'][i]['ciudad']  = resp2['results'][0]['ciudad'];
            i++;
          });
         this.list = resp['results'];
        });
     });
    }else if(this.table == "lider"){
      await this.bd.getTabla(this.table.toString()).toPromise().then( (resp) => {
        console.log(resp);
        
        let i = 0;
         resp['results'].map(async element =>{
           await this.bd.getDireccion(element['id_direccion']).toPromise().then(resp2 => {
             resp['results'][i]['calle']  = resp2['results'][0]['calle'];
             resp['results'][i]['fraccionamiento']  = resp2['results'][0]['fraccionamiento'];
             resp['results'][i]['numero']  = resp2['results'][0]['numero'];
             resp['results'][i]['ciudad']  = resp2['results'][0]['ciudad'];
             i++;
           });
          this.list2 = resp['results'];
         });
      });
    }else if(this.table == "empleado"){
      await this.bd.getTabla(this.table.toString()).toPromise().then( (resp) => {
        console.log(resp);
        
        let i = 0;
         resp['results'].map(async element =>{
           await this.bd.getDireccion(element['id_direccion']).toPromise().then(resp2 => {
             resp['results'][i]['calle']  = resp2['results'][0]['calle'];
             resp['results'][i]['fraccionamiento']  = resp2['results'][0]['fraccionamiento'];
             resp['results'][i]['numero']  = resp2['results'][0]['numero'];
             resp['results'][i]['ciudad']  = resp2['results'][0]['ciudad'];
             i++;
           });
          this.list3 = resp['results'];
         });
      });
    }
   }
}
