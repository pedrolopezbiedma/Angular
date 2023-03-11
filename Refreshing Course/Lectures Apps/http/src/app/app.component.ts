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
    // Send Http request
  }

  private fetchPosts(): void {
    this.isPending = true;
    this.postsService.fetchPosts().subscribe((posts: Post[]) => {
      this.loadedPosts = posts;
      this.isPending = false;
    })

  }
}
