import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  public API: string = environment.API
  constructor(private http: HttpClient) { }

  public getAllCourses():Observable<Course[]>{
    return this.http.get<Course[]>(this.API)
  }

  public getCourse(id:string | undefined):Observable<Course>{
    return this.http.get<Course>(`${this.API}/${id}`)
  }

  public addCourse(course:Course):Observable<Course>{
    return this.http.post<Course>(this.API, course)
  }

  public deleteCourse(id:number | undefined){
    return this.http.delete(`${this.API}/${id}`);
  }

  public updateCourse(course:Course, id:string):Observable<Course>{
    return this.http.put<Course>(`${this.API}/${id}`, course)
  }

}
