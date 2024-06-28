import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';

export const routes: Routes = [

    {
        path: 'productos',
        loadComponent: () => import('./componentes/producto/producto.component').then((c) => c.ProductoComponent)
    },
    {
        path: 'nuevo',
        loadComponent: () => import('./componentes/formulario/formulario.component').then((c) => c.FormularioComponent)
    },
    {
        path: 'editar/:idProducto',
        loadComponent: () => import('./componentes/formulario/formulario.component').then((c) => c.FormularioComponent)
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
