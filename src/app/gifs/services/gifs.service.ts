import { HttpClient, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'IDaiCGWAv5uNaxv1NhoMw9v5DFo7BDCC';
  private ServicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  // TODO  cambiar Any por tipo su tipo
  public resultados:  Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {

    // con el signo de admiración ! de digo a angular que confie en esta linea
    // ya que puede retornar nulos

    // OPCION 1
    this._historial = JSON.parse(localStorage.getItem("historial")!) || [];


    // OPCION 2
    // if (localStorage.getItem("historial")){
    //   this._historial = JSON.parse( localStorage.getItem("historial")!) ; 
    // }

    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || [];

   }


  buscarGifs(query: string = '') {

    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem("historial",JSON.stringify(this._historial));
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '10')
    .set('q', query);

    // console.log(params.toString());
    

    this.http.get<SearchGifsResponse>(`${ this.ServicioUrl}/search`, { params})
      .subscribe((response ) => {
        // console.log(response.data);
        this.resultados = response.data;
        localStorage.setItem("resultados",JSON.stringify(this.resultados));
      })



  }
}
