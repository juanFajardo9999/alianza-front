import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

  searchClientes(sharedKey: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}?sharedKey=${sharedKey}`);
  }

  advancedSearch(params: any): Observable<Client[]> {
    let httpParams = new HttpParams();
    
    if (params.businessId) httpParams = httpParams.set('businessId', params.businessId);
    if (params.phone) httpParams = httpParams.set('phone', params.phone);
    if (params.email) httpParams = httpParams.set('email', params.email);
    if (params.dateAdded) httpParams = httpParams.set('dateAdded', params.dateAdded);
    if (params.endDate) httpParams = httpParams.set('endDate', params.endDate);

    return this.http.get<Client[]>(`${this.apiUrl}/search`, { params: httpParams });
  }

  createCliente(cliente: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl, cliente);
  }
}
