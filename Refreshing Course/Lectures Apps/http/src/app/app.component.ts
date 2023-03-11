import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { Post } from './Post.model';
import { PostsService } from './posts.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isPending: boolean = false;
  error: string = null;
  loadedPosts: Post[] = [];

  constructor(
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.postsService.createPost(new Post(postData.title, postData.content))
  }

  onFetchPosts() {
    this.fetchPosts();
  }

  onClearPosts() {
    this.postsService.clearAllPosts()
      .subscribe(() => {
        this.loadedPosts = [];
      })
  }

  private fetchPosts(): void {
    this.isPending = true;
    this.postsService.fetchPosts().subscribe((posts: Post[]) => {
      this.loadedPosts = posts;
      this.isPending = false;
    }, (error: HttpErrorResponse) => {
      this.error = error.message;
      this.isPending = false;
    })
  }
}
