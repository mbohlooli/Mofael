import { ManagerGuard } from "./services/manager-guard.service";
import { HomeComponent } from "./home/home.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./services/auth-guard.service";
import { SchoolFormComponent } from "./school-form/school-form.component";
import { SchoolInfoComponent } from "./school-info/school-info.component";
import { ForbiddenComponent } from "./forbidden/forbidden.component";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "school/new",
    component: SchoolFormComponent,
    canActivate: [AuthGuard, ManagerGuard],
  },
  { path: "school/:id", component: SchoolFormComponent },
  { path: "school/info/:id", component: SchoolInfoComponent },
  { path: "403", component: ForbiddenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
