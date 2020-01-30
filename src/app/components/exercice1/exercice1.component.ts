import { Component, OnInit ,OnDestroy } from '@angular/core';
import { Observable, Subject,interval } from 'rxjs';
import { MovieService } from '../../services/movie/movie.service';
import { takeUntil, map, shareReplay, tap, distinctUntilChanged } from 'rxjs/operators';
import { error } from 'protractor';

const degHeur = 360 / 12;
const degMin = 360 / 60;
const degSec = degMin;



@Component({
  selector: 'app-exercice1',
  templateUrl: './exercice1.component.html',
  styleUrls: ['./exercice1.component.scss']
})

export class Exercice1Component implements OnInit {
//observer 

  destroy$: Subject<void> = new Subject();
  heurDegr$: Observable<number>;
  minDegr$: Observable<number>;
  secDegr$: Observable<number>;

  heur$: Observable<number>;
  min$: Observable<number>;
  sec$: Observable<number>;
  date$:Date;

  constructor(private $ser: MovieService) { }

  click() {
    this.$ser.GetData().subscribe(
      s => alert('OK'),
      err => {
        alert('error');
        console.log(err);
      }
    );
  }



  ngOnInit() {

    const date$ = interval(1000)
    .pipe(
        takeUntil(this.destroy$),
         map(() => new Date()),
        shareReplay()
      );

    
    this.heurDegr$ = date$.pipe(
      map(date => degHeur * date.getHours()+7),
      distinctUntilChanged()
    );


    this.minDegr$ = date$.pipe(
      map(date => degMin * date.getMinutes()),
      distinctUntilChanged()
    );
    this.secDegr$ = date$.pipe(
      map(date => degSec * date.getUTCSeconds()),
      distinctUntilChanged()
    );


 this.heur$ = date$.pipe(
      map(date => date.getHours(),
      distinctUntilChanged()
 ));


  this.min$ = date$.pipe(
      map(date => date.getMinutes(),
      distinctUntilChanged()
 ));

   this.sec$ = date$.pipe(
      map(date => date.getSeconds(),
      distinctUntilChanged()
 ));


  }


  ngOnDestroy() {
    this.destroy$.next();
  }



}


