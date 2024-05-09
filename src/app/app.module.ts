import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgxSimpleTextEditorModule} from 'ngx-simple-text-editor';
import { HistoryComponent } from './history/history.component';
import { EditorComponent } from './editor/editor.component';
@NgModule({
  declarations: [
    AppComponent,
    HistoryComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSimpleTextEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
