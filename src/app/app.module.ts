import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { AlyaariDataGridModule } from './shared/alyaari-data-grid/alyaari-data-grid.module';
 import { ReactiveFormsModule } from '@angular/forms';
 import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
 import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './user/user-list/user-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
  
@NgModule({
  declarations: [				
    AppComponent,
    
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    TableModule,
    HttpClientModule,
    ButtonModule,
    BrowserAnimationsModule,
    CommonModule
     
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
