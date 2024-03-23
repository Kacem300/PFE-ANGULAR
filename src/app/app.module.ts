import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './_auth/auth.interceptor';
import { UserService } from './_Services/user.service';
import { AuthGuard } from './_auth/auth.guard';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { DragDirective } from './drag.directive';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DetailsComponent } from './details/details.component';
import { BuyformComponent } from './buyform/buyform.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { FortestsComponent } from './fortests/fortests.component';
import { CartComponent } from './cart/cart.component';
import {MatTableModule} from '@angular/material/table';



import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {StyleClassModule} from 'primeng/styleclass';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { PasswordModule } from 'primeng/password';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import {RippleModule} from 'primeng/ripple';
import { MenubarModule } from 'primeng/menubar';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { TagModule } from 'primeng/tag';
import { MyordersadminComponent } from './myordersadmin/myordersadmin.component';


@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenComponent,
    AddNewProductComponent,
    DragDirective,
    ProductDetailsComponent,
    ImageDialogComponent,
    DetailsComponent,
    BuyformComponent,
    OrderConfirmComponent,
    RegisterComponent,
    FortestsComponent,
    CartComponent,
    HomeComponent,
    FooterComponent,
    MyOrdersComponent,
    MyordersadminComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    ButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    CheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    CardModule,
    StyleClassModule,
    DataViewModule,
    DropdownModule,
    RatingModule,
    PasswordModule,
    TableModule,
    InputTextModule,
    DialogModule,
    RadioButtonModule,
    InputNumberModule,
    FileUploadModule,
    ToolbarModule,
    RippleModule,
    MenubarModule,
    MatTableModule,
    TagModule,
  ],
  providers: [
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true,
    },
    UserService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
