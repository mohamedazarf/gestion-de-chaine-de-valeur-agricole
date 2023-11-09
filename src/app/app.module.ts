import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent} from './app.component';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { MyDirectiveDirective } from './my-directive.directive';
import { HomeComponent } from './home/home.component';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminProfileComponent } from './adminPages/admin-profile/admin-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListOfUsersComponent } from './adminPages/list-of-users/list-of-users.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { AproposComponent } from './apropos/apropos.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactComponent,
    LoginComponent,
    MyDirectiveDirective,
    HomeComponent,
    AdminProfileComponent,
    PageNotFoundComponent,
    ListOfUsersComponent,
    StatisticsComponent,
    AproposComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    NgbCollapseModule,
    HttpClientModule,
    CommonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
