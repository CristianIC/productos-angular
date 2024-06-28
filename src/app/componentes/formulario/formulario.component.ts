import { Component, Input, OnInit, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../servicios/producto.service';
import { ProductoInDTO } from '../../dto/inputs/producto.in.dto';
import { ResponseDTO } from '../../dto/response.dto';
import { Router } from '@angular/router';
import { ProductoDTO } from '../../dto/producto.dto';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{

  productoService = inject(ProductoService);
  
  @Input('idProducto')
  idProducto!: number;

  router = inject(Router);

  accion = "Nuevo";

  constructor(private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    //console.log("formulario:");
    //console.log(this.idProducto);
    if (this.idProducto !== undefined) {
      this.getById(this.idProducto);
      this.accion = "Editar";
    }
  }

  formulario = this.formBuilder.group( 
    {
      nombre: [""],
      descripcion: [""],
      precio: [0]
    }
  );

  public validarAccion() {
    if (this.idProducto !== undefined) {
      this.update();
    } else {
      this.guardar();
    }
  }

  public guardar(): void {
    //console.log(this.formulario.value);
    let producto: ProductoInDTO = this.formulario.value as ProductoInDTO;
    

    if (this.formulario.valid) {
      this.productoService.save(producto).subscribe( 
        {
          next: (respuesta: ResponseDTO) => {
            if (respuesta.status && respuesta.codeStatus === 201) {
              //console.log(respuesta);
              this.router.navigateByUrl('/productos');
            }
          }
        }
      )
    }
    
  }

  public getById(idProducto: number) {
    this.productoService.getById(idProducto).subscribe(
      {
        next: (respuesta: ResponseDTO) => {
          if (respuesta.status && respuesta.codeStatus === 200) {
            //console.log(respuesta);
            const producto = respuesta.data as ProductoDTO;
            this.llenarForm(producto);
          }
        }
      }
    )
  }

  private llenarForm(producto: ProductoDTO) {
    this.formulario.patchValue(
      {
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio
      }
    )
  }

  public update() {
    let producto: ProductoInDTO = this.formulario.value as ProductoInDTO;
    producto.id = this.idProducto;
    this.productoService.update(producto).subscribe( 
      {
        next: (respuesta: ResponseDTO) => {
          if (respuesta.status && respuesta.codeStatus === 200) {
            //console.log(respuesta);
            this.router.navigateByUrl('/productos');
          }
        }
      }
    )
  }

}
