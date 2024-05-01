import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient ) { }

  // Função para obter o conteúdo do arquivo
  async getInfo() {
    const response = await this.http.get<any>(`${this.baseUrl}/info`).toPromise();
    return response;
  }

  // Função para salvar nova informação
  async saveInfo(newContent: any) {
    const response = await this.http.post<any>(`${this.baseUrl}/info`, newContent).toPromise();
    return response;
  }


  // Função para atualizar informação
  async updateInfo(oldTimestamp: number, newData: any) {
    const response = await this.http.put<any>(`${this.baseUrl}/update-info/${oldTimestamp}`, newData).toPromise();
    return response;
  }

  // Função para deletar informação
  async deleteInfo(timestamp: number) {
    const response = await this.http.delete<any>(`${this.baseUrl}/delete-info/${timestamp}`).toPromise();
    return response;
  }

}
