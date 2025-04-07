import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form-valid',
  templateUrl: './form-valid.component.html',
  styleUrl: './form-valid.component.css'
})
export class FormValidComponent {
  formUser!:FormGroup;
  constructor(private _httpPost:HttpService, private _fb:FormBuilder){
    this.formUser = this._fb.group({
      username:['',Validators.required],
      pass:['',Validators.required]
    })
  }

  
  submit(){
    if (!this.formUser.valid) {
      Swal.fire({
        icon:"error",
        title: 'No ha ingresado correctamente',
        text: 'Los datos no son válidos'
      })
      return ;
    }

      Swal.fire({
        title: 'cargando',
        didOpen:()=>{
          Swal.showLoading();
        },
        timer:3000
      })
      Swal.close
      let data:FormData = new FormData();
      data.append("username",this.formUser.get("username")!.value)
      data.append("pass",this.formUser.get("pass")!.value)
      let datos = this._httpPost.postUser(data)
      console.log(datos.get("username"))
      console.log(datos.get("pass"))
      setTimeout(() => {
        
        Swal.fire({
          icon:"success",
          title: 'Proceso Correcto',
          text: `Se ingresó con los datos: Usuario:${datos.get("username")} Contraseña:${datos.get("pass")}`
        })
      }, 2000);
      
      return;
    


  }
}
