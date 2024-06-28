import { Component, OnInit, inject } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import { ResponseDTO } from '../../dto/response.dto';
import { PaginationDTO } from '../../dto/pagination.dto';
import { ProductoDTO } from '../../dto/producto.dto';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';
import { RouterLink } from '@angular/router';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator'

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [MatButtonModule, MatDividerModule, MatIconModule, MatCardModule, MatTableModule, RouterLink, MatPaginatorModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {


  private readonly productoService = inject(ProductoService);

  paginationDTO: Partial<PaginationDTO> = {};

  listaProductos: ProductoDTO[] = [];

  currentPage = 1;

  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio', 'estado', 'acciones'];

  readonly dialog = inject(MatDialog);

  pageSizeOpts = [10];
  totalRows: number = 0;
  totalPages: number = 0;

  ngOnInit(): void {
    this.getPagination(this.currentPage);
  }

  public getPagination(page: number): void {
    this.productoService.getPagination(page).subscribe(
      {
        next: (respuesta: ResponseDTO) => {
          if (respuesta.status && respuesta.codeStatus === 200) {
            //console.log(respuesta);
            this.paginationDTO = respuesta.data as PaginationDTO;
            this.listaProductos = this.paginationDTO.elements as ProductoDTO[];
            //console.log(this.paginationDTO);
            this.totalRows = this.paginationDTO.totalElements!;
            this.totalPages = this.paginationDTO.totalPages!;
          }
        }
      }
    );
  }

  public openDialog(producto: ProductoDTO): void {

    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: producto,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined && result === true) {
        this.eliminar(producto.id);
      }
    });

  }

  public eliminar(id: number): void {
    this.productoService.delete(id).subscribe(
      {
        next: (respuesta: ResponseDTO) => {
          if (respuesta.status && respuesta.codeStatus === 200) {
            this.getPagination(this.currentPage);
          }
        }
      }
    )
  }

  public handlePaging(pageInfo: PageEvent) {
    this.getPagination(pageInfo.pageIndex + 1);
  }

}
