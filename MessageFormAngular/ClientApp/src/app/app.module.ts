import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MessageFormComponent } from './message-form.component';
import { MessageDetailComponent } from './message-detail.component';

import { DataService } from './data.service';

const appRoutes: Routes = [
    { path: '', component: MessageFormComponent },
    { path: 'message/:id', component: MessageDetailComponent },
    { path: '**', redirectTo: '/' }
];

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, MessageFormComponent, MessageDetailComponent],
    providers: [DataService],
    bootstrap: [AppComponent]
})
export class AppModule { }