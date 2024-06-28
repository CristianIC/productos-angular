import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductoComponent } from './componentes/producto/producto.component';
import { FormularioComponent } from './componentes/formulario/formulario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductoComponent, FormularioComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'productos';
}
