import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Country } from 'src/app/model/country';

@Injectable({
    providedIn: 'root'
  })
export class CountryService {
    constructor(private $http: HttpClient) {

    }

    getData(): Observable<any> {
        
        return this.$http.get('https://api.themoviedb.org/3/discover/movie?api_key=ee49c8259e97a026f442184de86d7e27');
    }
}