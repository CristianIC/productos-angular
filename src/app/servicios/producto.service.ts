import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseDTO } from '../dto/response.dto';
import { ProductoInDTO } from '../dto/inputs/producto.in.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private readonly http = inject(HttpClient);

  private readonly PATH_PRINCIPAL = 'http://localhost:8080/api/v1/productos';

  constructor() { }

  public getPagination(page: number): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(this.PATH_PRINCIPAL + '/page/' + page);
  }

  public save(producto: ProductoInDTO): Observable<ResponseDTO> {
    return this.http.post<ResponseDTO>(this.PATH_PRINCIPAL, producto);
  }

  public delete(id: number): Observable<ResponseDTO> {
    return this.http.delete<ResponseDTO>(this.PATH_PRINCIPAL + '/' + id);
  }

  public update(producto: ProductoInDTO): Observable<ResponseDTO> {
    return this.http.put<ResponseDTO>(this.PATH_PRINCIPAL, producto);
  }

  public getById(idProducto: number): Observable<ResponseDTO> {
    return this.http.get<ResponseDTO>(this.PATH_PRINCIPAL + '/' + idProducto);
  }

}
