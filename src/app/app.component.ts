import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpServiceService } from './service/http-service.service';
import { JsonPipe } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    JsonPipe, 
    ReactiveFormsModule, 
    MatSelectModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [provideNativeDateAdapter()],
})
export class AppComponent implements OnInit{


  httpService = inject(HttpServiceService)

  constructor(private fb : FormBuilder) {}

  projectGroup : FormGroup = this.fb.group({
    projectName : ['', [Validators.required]],
    projectStartDate : ['', [Validators.required]],
    projectEndDate : ['', [Validators.required]],
    completed : [false , [Validators.required]],
    description : ['', [Validators.required]],
    technology : this.fb.array(['']),
    cost : ['', [Validators.required]],
    link : this.fb.array([
      this.fb.group({
        address : [''],
        port : [''],
        type : ['']
      })
    ]
    )
  })

  techList: Array<any> = []

  addTech(val :any) {
    const value = val.source.value
    if(val.checked){
      this.techList.push(value)
    } else {
      this.techList = this.techList.filter((val:any) => val!=value)
    }
  }

  get link(){
    return this.projectGroup.get('link') as FormArray;
  }

  addLink() {
   this.link.push(
    this.fb.group({
      address : [''],
      port : [''],
      type : ['']
    })
   ) 
  }

  deleteLink(index: any) {
    this.link.removeAt(index);
  }

  addProject(){
    this.projectGroup.value.technology = this.techList
    const project = this.projectGroup.value 
    //console.log(project);
    this.httpService.addNewProject(project).subscribe(res => this.ngOnInit()
    )
  }

  ngOnInit(): void {
    this.httpService.getAllData().subscribe(
      res => this.projects.set(res)
    )
  }
  title = 'signal-with-httpclient';

  
  projects = signal([]); 
}
