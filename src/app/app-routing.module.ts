import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ResolverService } from './resolver.service';
import { DetailsComponent } from './details/details.component';
import { BuyformComponent } from './buyform/buyform.component';
import { BuyformResolverService } from './buyform-resolver.service';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { RegisterComponent } from './register/register.component';
import { FortestsComponent } from './fortests/fortests.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyordersadminComponent } from './myordersadmin/myordersadmin.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
{path:'',component:GalleryComponent},
{path:'addNewProduct',component:AddNewProductComponent,canActivate:[AuthGuard],data:{roles:['Admin']},
resolve:{
  product:ResolverService
}},
{path:'admin',component:AdminComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
{path:'user',component:UserComponent,canActivate:[AuthGuard],data:{roles:['User']}},
{path:'userProfile',component:UserProfileComponent,canActivate:[AuthGuard],data:{roles:['User']}},
{path:'home',component:HomeComponent},
{path:'login',component:LoginComponent},
{path:'forbidden',component:ForbiddenComponent},
{path:'productDetails',component:ProductDetailsComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
{path:'details',component:DetailsComponent,resolve:{product:ResolverService} },
{path:'buyProduct',component:BuyformComponent,canActivate:[AuthGuard],data:{roles:['User']},
resolve:{
  productDetails:BuyformResolverService
}},
{path:'orderConfirm',component:OrderConfirmComponent,canActivate:[AuthGuard],data:{roles:['User']}},
{path:'myOrders',component:MyOrdersComponent,canActivate:[AuthGuard],data:{roles:['User']}},
{path:'Myordersadmin',component:MyordersadminComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
{path: 'emailVerification', component: EmailVerificationComponent},
{path:'register',component:RegisterComponent},
{path:'fortests',component:FortestsComponent},
{path:'cart',component:CartComponent},
{path:'addCategory',component:AddcategoryComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
{path:'users',component:UsersComponent,canActivate:[AuthGuard],data:{roles:['Admin']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
