import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DataTableComponent } from './data-table/data-table.component';
import { SchoolFormComponent } from './school-form/school-form.component';
import { SchoolInfoComponent } from './school-info/school-info.component';
import { SchoolManagerComponent } from './school-manager/school-manager.component';
import { InfoCardComponent } from './info-card/info-card.component';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { PaginationComponent } from './pagination/pagination.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    DataTableComponent,
    SchoolFormComponent,
    SchoolInfoComponent,
    SchoolManagerComponent,
    InfoCardComponent,
    ConfirmationModalComponent,
    PaginationComponent,
    ForbiddenComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
