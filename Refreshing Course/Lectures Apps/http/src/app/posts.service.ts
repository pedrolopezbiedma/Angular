import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './Post.model';

@Injectable({providedIn: 'root'})
export class PostsService {
  endpoint = 'https://angular-course-project-bab02-default-rtdb.europe-west1.firebasedatabase.app/posts.json';

  constructor(private http: HttpClient) { }

  fetchPosts(): Observable<Post[]> {
    return this.http.get<{ [key : string]: Post }>(this.endpoint)
      .pipe(
        map(response => {
          let postsArray = [];
          for(const objectKey in response){
            postsArray.push({ Id: objectKey, ...response[objectKey]} )
          }
          return postsArray
        })
      )
  }

  createPost(newPost: Post): void {
    this.http.post<{ name: string }>(this.endpoint, newPost).subscribe((response) => {
      console.log(response);
    })
  }
}
