import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BDService } from '../services/bd.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  proyectos: any;
  clientes: any;
  proyecto: FormGroup;
  proyecto2: FormGroup;
  cliente: FormGroup;
  resultados: any;
  resultados2: any;
  resultados3: any;
  resultados4: any;
  resultados5: any;
  resultadosVista1: any;
  resultadosVista2: any;
  resultadosVista3: any;
  constructor(private bd: BDService) { 
    this.bd.getTabla('proyecto').subscribe(resp => {
      this.proyectos = resp['results'];
    });
    this.bd.getTabla('cliente').subscribe(resp => {
      this.clientes = resp['results'];
    });

    this.proyecto = new FormGroup({
      proyectoss : new FormControl(),
    });
    this.proyecto2 = new FormGroup({
      proyectoss : new FormControl(),
    });
    this.cliente = new FormGroup({
      id_cliente : new FormControl(),
    });
  }

  ngOnInit(): void {
  }
  onSubmit(data){
    this.bd.getReporte1(data.proyectoss).subscribe(res => {
      this.resultados = res['results'];
    });
  }
  onSubmit2(data){
    this.bd.getReporte2(data.id_cliente).subscribe(res => {
      this.resultados2 = res['results'];
    });
  }
  onSubmit3(){
    this.bd.getReporte3().subscribe(res => {
      this.resultados3 = res['results'];
    });
  }
  onSubmit4(){
    this.bd.getReporte4().subscribe(res => {
      this.resultados4 = res['results'];
    });
  }
  onSubmit5(data){
    this.bd.getReporte5(data.proyectoss).subscribe(res => {
      this.resultados5 = res['results'];
    });
  }
  onSubmitVista1(){
    this.bd.getVista1().subscribe(res => {
      this.resultadosVista1 = res['results'];
    });
  }
  onSubmitVista2(){
    this.bd.getVista2().subscribe(res => {
      this.resultadosVista2 = res['results'];
    });
  }
  onSubmitVista3(){
    this.bd.getVista3().subscribe(res => {
      this.resultadosVista3 = res['results'];
    });
  }
}
