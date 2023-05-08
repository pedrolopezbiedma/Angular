import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, interval, tap } from 'rxjs';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  posts$: Observable<Post[]> = new Observable();
  timer$: Observable<number> = new Observable();
  counter$: Observable<number> = new Observable();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.exerciseOne();
    this.exerciseTwo();
  }

  exerciseOne(): void {
    this.posts$ = this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts/')
  }

  exerciseTwo(): void {
    this.counter$ = interval(1000);
  }


}
