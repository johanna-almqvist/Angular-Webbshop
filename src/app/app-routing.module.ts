import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MovieComponent } from './components/movie/movie.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrderDoneComponent } from './components/order-done/order-done.component';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  { path: '', component: MovieComponent },
  { path: 'order', component: OrderComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'check-out', component: CheckOutComponent },
  { path: 'orderDone', component: OrderDoneComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
