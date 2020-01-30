import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  forma:FormGroup;

  usuario:Object ={
    nombreCompleto:{
      nombre:'fernando',
      apellido:'herrera'
    },
    
    email:'mail@mail.com',
    pasatiempos:["Comer","Dormir","Garchar"]
  }


  constructor() {
    this.forma = new FormGroup({
      nombreCompleto: new FormGroup({
      'nombre': new FormControl('',Validators.required),
      'apellido': new FormControl('',[Validators.required,this.noHerrera])}),
      'email': new FormControl('',[Validators.required,Validators
        .pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
       pasatiempos: new FormArray([
         new FormControl('',Validators.required)
       ]),
       'userName': new FormControl('',Validators.required,this.existeUsuario),
       'password1': new FormControl('',Validators.required),
       'password2':new FormControl()
    })

    this.forma.controls['password2'].setValidators([
      Validators.required,this.noIgual.bind(this.forma)
    ])

    //this.forma.setValue(this.usuario);

    this.forma.controls['userName'].valueChanges.subscribe(data =>{
      console.log(data);
    })

    this.forma.controls['userName'].statusChanges.subscribe(data =>{
      console.log(data);
    })
  }

  ngOnInit() {
  }

  guardarCambios(){
    console.log(this.forma);
    this.forma.reset({
        nombreCompleto:{
          nombre:"",
          apellido:""
        },
        correo:""
    });
  }

  agregarPastiempo(){
    (<FormArray>this.forma.controls['pasatiempos']).push(
      new FormControl('Dormir',Validators.required)
    )
  }

  noHerrera(control:FormControl):{[s:string]:boolean}{
    if (control.value ==="herrera"){
      return{ noHerrera:true}
    }
  
    return null;
  }

  noIgual(control:FormControl):{[s:string]:boolean}{
    let forma:any = this;
    if (control.value !==forma.controls['password1'].value){
      return{ noIguales:true}
    }
  
    return null;
  }

  existeUsuario(control:FormControl):Promise<any>|Observable<any>{
    let promesa =new Promise(
      (resolve, rejected)=>{
        setTimeout( ()=>{
          if (control.value === 'strider'){
              resolve({existe:true})
          }else{
            return null;
          }
        },3000)  
        
      }

    )

    return promesa;
  }
}
