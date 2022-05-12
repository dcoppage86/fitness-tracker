import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// App Intialization
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// NgRx State Management
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';

// Modules
import { AuthModule } from './auth/auth.module';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Services
import { AuthService } from './auth/auth.service';
import { UIService } from './shared/ui.service';
import { TrainingService } from './training/training.service';

// Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

// Material
import { MaterialModule } from './material/material.module';

// Flex Layout
import { FlexLayoutModule } from '@angular/flex-layout';

// App Components (Login, Signup, Header, Welcome, Sidenav)
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AuthModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
      autoPause: true,
    }),
  ],
  providers: [AuthService, TrainingService, UIService],
  bootstrap: [AppComponent],
})
export class AppModule {}
