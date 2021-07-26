import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  public subscription!:Subscription;
  public subParams!:Subscription;
  public param!:string;

  profileCourse = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
  });
  constructor(public CourseService:CourseService, public routeService:Router, public ActivatedRoute:ActivatedRoute ) { }

  ngOnInit(): void {
    this.getParams();
    this.getCourse(this.param);
  }

  public getParams(){
    this.subParams = this.ActivatedRoute.params.subscribe(({id}) =>{
      this.param = id;
    })
  }

  public getCourse(id:string){
    this.subParams = this.CourseService.getCourse(id).subscribe(data=>{
      this.profileCourse.controls.name.setValue(data.name);
      this.profileCourse.controls.description.setValue(data.description);
      this.profileCourse.controls.price.setValue(data.price);
    })
  }

  public onSave(){
    let course:Course = {
      name : this.profileCourse.controls.name.value,
      description : this.profileCourse.controls.description.value,
      price : this.profileCourse.controls.price.value,
    }
    this.subscription = this.CourseService.updateCourse(course, this.param).subscribe((data:Course)=>{
      if(data?.id){
        this.routeService.navigate(['courses'])
      }
    })
  }

}
