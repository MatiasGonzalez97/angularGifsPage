import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey : string = '90z2ngM0iwMx8RaAptmo73iTzI0XYkin';
  private _historial : string[] = [];
  private url : string = 'https://api.giphy.com/v1/gifs';

  public resultados : Gif[] = [];

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []; //para el sidebar

    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []; //para el content main
    // resultados : [] =JSON.parse(localStorage.getItem('historial')![0]) || []; 
    // this.resultados = resultados;
  }

  get historial() {
    return [...this._historial];
  }

  buscarGifs( query : string = '') {

      query = query.trim().toLocaleLowerCase();

      if(!this._historial.includes(query)) { //Comprueba que solo guarde cuando es no existente en el array

        this._historial.unshift(query); //Guarda en array
        this._historial = this._historial.splice(0,10); //"Corta el array para que solo sean 10"

        localStorage.setItem('historial',JSON.stringify(this._historial)); //almacenamos en localStorage
      }

      const params = new HttpParams().
                      set('api_key',this.apiKey)
                      .set('limit','10')
                      .set('q',query);

      this.http.get<SearchGifsResponse>(`${ this.url }/search`,{params})
                    .subscribe( ( resp )=>{
                        this.resultados = resp.data;
                        localStorage.setItem('resultados',JSON.stringify(this.resultados));
                    });
      



  }

}
