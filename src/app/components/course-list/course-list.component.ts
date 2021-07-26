import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  public subGetAllCourse!: Subscription;
  public subDeleteCourse!: Subscription;
  public courses: Course[] = [];

  constructor(public CourseService: CourseService) { }

  ngOnInit(): void {
    this.getAllCourse()
  }

  public getAllCourse() {
    this.subGetAllCourse = this.CourseService.getAllCourses().subscribe((data: Course[]) => {
      this.courses = data;
    })
  }

  public deleteCourse(id: number | undefined) {
    this.subDeleteCourse = this.CourseService.deleteCourse(id).subscribe(data => {
      this.updateCourses(id)
    })
  }

  public updateCourses(id: number | undefined) {
    let index = this.courses.findIndex((element)=>{
      return element.id === id
    })
    this.courses.splice(index, 1);
  }

  ngOnDestroy(): void {
    if (this.subGetAllCourse) {
      this.subGetAllCourse.unsubscribe();
    }
  }
}
