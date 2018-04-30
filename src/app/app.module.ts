import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { ShoesComponent } from './components/shoes/shoes.component';
import { ClothesComponent } from './components/clothes/clothes.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CartComponent } from './components/cart/cart.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignoutComponent } from './components/signout/signout.component';
import { AddComponent } from './components/Admin/add/add.component';

// forms
import { FormsModule } from '@angular/forms';

//  Material
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';


// firebase
 import { AngularFireDatabaseModule } from 'angularfire2/database';
 import { AngularFireModule } from 'angularfire2';
 import {AngularFireAuth, AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from '../environments/environment';

// services
import { FirebaseService } from './services/firebase.service';
import { PostService } from './services/post.service';
import {AuthService} from './services/auth.service';
// import {AdminGuard} from './services/admin.guard';

// Routes
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ViewComponent } from './components/Admin/view/view.component';
import { DeleteComponent } from './components/Admin/delete/delete.component';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {UserService} from './services/user.service';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AdminGuard} from './services/admin.guard';
import {AuthGuard} from './services/auth.guard';




const appRoutes: Routes = [
   { path: '', component: HomeComponent},
   { path: 'login', component: LoginComponent},
   { path: 'clothes', component: ClothesComponent},
   { path: 'shoes', component: ShoesComponent},
   { path: 'cart', component: CartComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'signout', component: SignoutComponent},
  { path: 'add', component: AddComponent, canActivate: [AdminGuard, AuthGuard]},
//  { path: 'add', component: AddComponent},
  { path: 'delete', component: DeleteComponent},
  { path: 'view', component: ViewComponent}

 ]

@NgModule({
  declarations: [
    AppComponent,
    ShoesComponent,
    ClothesComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    CartComponent,
    SignupComponent,
    SignoutComponent,
    AddComponent,
    ViewComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule, MatInputModule,
    MatMenuModule, MatFormFieldModule,
    MatIconModule, MatCardModule,
    AngularFireModule.initializeApp(environment.firebase, 'webshop'),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    RouterModule.forRoot(appRoutes),
    AngularFirestoreModule

   // StoreModule.forRoot(reducers),
   // EffectsModule.forRoot(effects)
  ],
  exports: [RouterModule],
  providers: [FirebaseService, PostService, AuthService, UserService, AdminGuard, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule { }
