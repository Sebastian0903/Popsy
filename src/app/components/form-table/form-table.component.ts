import { Component } from '@angular/core';

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
  styleUrl: './form-table.component.css'
})
export class FormTableComponent {

  onSubmit(e:any){
    e.prevent.default()
    console.log(e)
  }
}
