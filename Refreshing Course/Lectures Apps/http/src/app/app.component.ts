import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './Post.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  endpoint = 'https://angular-course-project-bab02-default-rtdb.europe-west1.firebasedatabase.app/posts.json';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    console.log(postData);
    // Send Http request
    this.http.post<{ name: string }>(this.endpoint, postData).subscribe((response) => {
      console.log(response);
    })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }

  private fetchPosts() {
    this.http.get<{ [key : string]: Post }>(this.endpoint)
      .pipe(
        map(response => {
          let postsArray = [];
          for(const objectKey in response){
            postsArray.push({ Id: objectKey, ...response[objectKey]} )
          }
          return postsArray
        })
      )
      .subscribe((posts: Post[]) => {
        console.log(posts)
      })
  }
}
