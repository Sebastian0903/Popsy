import { HttpClient } from '@angular/common/http';
import { Component, signal } from '@angular/core';
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
  formUserSignal = signal("")
  formPassSignal = signal("")
  formUserSignalBool = signal(false)
  formPassSignalBool = signal(false)
  isValidUser = false
  isValidPass = false

  emailErrors = signal({
    required: 'El email es requerido',
    invalidEmail: ''
  });

  constructor(private _httpPost:HttpService, private _fb:FormBuilder){
    this.formUser = this._fb.group({
      username:['',Validators.required],
      pass:['',Validators.required]
    })

    this.formUser.get('username')?.valueChanges.subscribe(() => {
      const resp = this.validarEmail(this.formUser.get("username")?.value)
      this.formUserSignal.set(resp.message)
      console.log(resp)
      this.formUserSignalBool.set(resp.isValid)
      this.isValidUser = resp.isValid
    });

    this.formUser.get('pass')?.valueChanges.subscribe(() => {
      const respPass = this.validarPass(this.formUser.get("pass")?.value)
      console.log(respPass)
      this.formPassSignal.set(respPass.message)
      this.formPassSignalBool.set(respPass.isValid)
      this.isValidUser = respPass.isValid
    });
  }

  validarEmail(email: string): {isValid: boolean, message: string} {
    if (!email || email.trim() === '') {
        return {isValid: false, message: 'El correo electrónico no puede estar vacío'};
    }

    if (!email.includes('@')) {
        return {isValid: false, message: 'El correo electrónico debe contener un @'};
    }

    const parts = email.split('@');
    const localPart = parts[0];
    const domainPart = parts[1];

    if (localPart.length === 0) {
        return {isValid: false, message: 'Debe haber texto antes del @'};
    }

    if (/[^a-zA-Z0-9._+-]/.test(localPart)) {
        return {isValid: false, message: 'La parte antes del @ contiene caracteres no permitidos'};
    }

    if (!domainPart) {
        return {isValid: false, message: 'Debe haber texto después del @'};
    }

    if (!domainPart.includes('.')) {
        return {isValid: false, message: 'El dominio debe contener un punto (.)'};
    }

    // Validar extensión del dominio (después del último punto)
    const domainParts = domainPart.split('.');
    const extension = domainParts[domainParts.length - 1];
    
    if (extension.length < 2) {
        return {isValid: false, message: 'La extensión del dominio debe tener al menos 2 caracteres'};
    }

    if (/[^a-zA-Z0-9.-]/.test(domainPart)) {
        return {isValid: false, message: 'El dominio contiene caracteres no permitidos'};
    }

    const emailRegex = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return {isValid: false, message: 'El formato del correo electrónico no es válido'};
    }

    return {isValid: true, message: 'El correo electrónico es válido'};
  }

  validarPass(pass: string): {isValid: boolean, message: string} {
    if (!pass || pass.trim() === '') {
        return {isValid: false, message: 'El campo contraseña no puede estar vacío'};
    }

    if (pass.length < 6) {
      return {isValid: false, message: 'La longitúd mínima de contraseña debe ser de 6 caracteres'};
    }

    if (!/[A-Z]/.test(pass)) {
      return {isValid: false, message: 'La contraseña debe tener por lo menos una letra en mayúscula'};
    }

    return {isValid: true, message: 'El contraseña es válida'};
  }

  submit(){
    
    if ((this.isValidUser == this.isValidPass)) {
      Swal.fire({
        icon:"error",
        title: 'No ha ingresado correctamente',
        text: 'Los datos no son válidos',
      })
      return ;
    }

      Swal.fire({
        title: 'Cargando',
        didOpen: () => Swal.showLoading(),
        allowOutsideClick: false,
        showConfirmButton: false
      });

      Swal.close
      let data:FormData = new FormData();
      data.append("username",this.formUser.get("username")?.value)
      data.append("pass",this.formUser.get("pass")?.value)
      
      let datos = this._httpPost.postUser(data)

      const email = datos.get('username') as string;
      const pass = datos.get('pass') as string;
      
      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: 'Proceso simulado correctamente',
          text: `Datos ingresados: Usuario: ${email}`,
        });

        const formData = new FormData();
        formData.append('username', email);
        formData.append('pass', pass);
        Swal.fire({
          icon:"success",
          title: 'Proceso Correcto',
          text: `Se ingresó con los datos: Usuario:${email} Contraseña:${pass}`
        })
      }, 2000);
      
      return;
  }
}
