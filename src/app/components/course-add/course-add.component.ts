import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss']
})
export class CourseAddComponent implements OnInit {

  public subscription!:Subscription;

  profileCourse = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    price: new FormControl(''),
  });
  constructor(public CourseService:CourseService, public routeService:Router) { }

  ngOnInit(): void {
  }

  public onSubmit(){
    let course:Course = {
      name : this.profileCourse.controls.name.value,
      description : this.profileCourse.controls.description.value,
      price : this.profileCourse.controls.price.value,
    }
    this.subscription = this.CourseService.addCourse(course).subscribe((data:Course)=>{
      if(data?.id){
        this.routeService.navigate(['courses'])
      }
    })
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
