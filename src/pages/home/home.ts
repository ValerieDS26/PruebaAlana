import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ServiceProvider } from '../../providers/service/service' 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  final_array:Array<any>=[];
  inicio:number;
  fin:number;
  inicioFirst:number;
  current_position:number;
  perfects_squares:any=[];
  err:string='';
  verify:boolean; 
  constructor(public serviceProvider: ServiceProvider) {
  }

  ngOnInit() {
  }
  
  //TEST - PARTE 1 
  start(){  
    if(+(this.inicioFirst) < 0 || this.fin < 0){

      this.err='Los valores del intervalo deben ser positivos.';

    }else if(+(this.inicioFirst) > this.fin){
      this.err='El intervalo no es correcto';
    }else{
      this.inicio=+(this.inicioFirst);
      for (this.inicio; this.inicio <= this.fin; this.inicio++) {
        this.current_position=this.inicio;
        this.getDividers(this.inicio);
        if( this.inicio == this.fin){
          this.getPerfectSquares();
        }
      }
    }    
  }

  getDividers(num: number){
    var aux = Math.floor(Math.sqrt(num)); 
    var array=[];
    for (let i = 1; i <= aux; i++) { 
      if( num % i == 0){
        array.push(i);
        if(i != Math.sqrt(num)){
          array.push(num/i);
        }
      } 
    }

    this.getArrayPow(array,2);
  }

  getArrayPow(array: Array<number> ,p: number){
    
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.pow(array[i],p);
      if(i == array.length-1){
        this.getArraySum(array)
      }
    }

  }

  getArraySum(array: Array<number>){
    var sum = 0;

    for (let i = 0; i < array.length; i++) {
       sum = sum + array[i];
       if(i == array.length -1 ){
        this.final_array.push({
          'position': this.current_position,
          'sum': sum,
          'bool': this.isPerfectSqrt(sum)
        });
       }
    }      
  }

  isPerfectSqrt(n){
    return Number.isInteger(Math.sqrt(n));
  }

  getPerfectSquares(){
    this.perfects_squares = this.final_array.filter( res => res.bool == true);
    if(this.perfects_squares.length == 0){
      this.verify= true;
    }else{
      this.verify=false;
    }
    console.log(this.perfects_squares);

  }

  clearData(){
    this.err='';
    this.verify=false;
    this.perfects_squares=[];
    this.final_array=[];
  }

  //TEST - PARTE 2
  
  goService(){
    this.serviceProvider.goService().subscribe((response)=>{
      console.log(response);
    },err=>{
      console.log(err);
    })
  } 


}
