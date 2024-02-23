import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_auth/auth.guard';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ResolverService } from './resolver.service';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
{path:'',component:HomeComponent},
{path:'addNewProduct',component:AddNewProductComponent,canActivate:[AuthGuard],data:{roles:['Admin']},
resolve:{
  product:ResolverService
}},
{path:'admin',component:AdminComponent,canActivate:[AuthGuard],data:{roles:['Admin']}},
{path:'user',component:UserComponent,canActivate:[AuthGuard],data:{roles:['User']}},
{path:'login',component:LoginComponent},
{path:'forbidden',component:ForbiddenComponent},
{path:'productDetails',component:ProductDetailsComponent,canActivate:[AuthGuard],data:{roles:['Admin']},},
{path:'details',component:DetailsComponent,resolve:{product:ResolverService} },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
