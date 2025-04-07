import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { DataSource } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import {FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  constructor(private _httpService:HttpService){}
 

  displayedColumns: string[] = ['positionn', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource();

  private _formBuilder = inject(FormBuilder);
  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  ngOnInit(): void {
    this.dataSource.data = this._httpService.getTask();
  }

}
