import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseAddComponent } from './components/course-add/course-add.component';
import { CourseEditComponent } from './components/course-edit/course-edit.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CoursesComponent } from './components/courses/courses.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "courses",
    component: CoursesComponent,
    children: [
      {
        path: "",
        component: CourseListComponent
      },
      {
        path: "add",
        component: CourseAddComponent
      },
      {
        path: "edit/:id",
        component: CourseEditComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
