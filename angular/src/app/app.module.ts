import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { BlogComponent } from './blog/blog.component';
import { BlogPostDetailComponent } from './blog/blog-post-detail/blog-post-detail.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    BlogComponent,
    BlogPostDetailComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
