import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PostsService {

  basePath = `http://localhost:3000/api`

  private postUpdate = new Subject<Post[]>();
  private posts: Post[] =
    [];
  // [{ id: '2', title: "First Post", content: "A 1 First line of the post " },
  // { id: '3', title: "Second Post", content: "B 2 Second line of the post " },
  // { id: '4', title: "Third Post", content: "C 3 Third line of the post " },];

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {

  }

  getPosts() {
    this.http.get<{ message: string, posts: Post[] }>(this.basePath + "/posts")
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postUpdate.next([...this.posts]);
      });

    // return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postUpdate.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: "", title: title, content: content };

    this.http.post(this.basePath + "/posts", post)
      .subscribe((responseData) => {
        console.log(responseData);
        this.posts.push(post);
        this.postUpdate.next([...this.posts]);

      });

    // this.posts.push(post);
    // this.postUpdate.next([...this.posts]);
  }

}
