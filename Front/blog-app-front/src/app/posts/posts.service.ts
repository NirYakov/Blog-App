import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class PostsService {

  basePath = `http://localhost:3000/api`

  private postsUpdate = new Subject<Post[]>();
  private posts: Post[] =
    [];
  // [{ id: '2', title: "First Post", content: "A 1 First line of the post " },
  // { id: '3', title: "Second Post", content: "B 2 Second line of the post " },
  // { id: '4', title: "Third Post", content: "C 3 Third line of the post " },];

  constructor(private http: HttpClient, private router: Router) {

  }

  ngOnInit(): void {

  }

  getPosts() {
    this.http.get<{ message: string, posts: any }>(this.basePath + "/posts")
      .pipe(map((postData) => {
        return postData.posts.map((post: any) => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          };
        });
      }))
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdate.next([...this.posts]);
      });

    // return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdate.asObservable();
  }

  getPost(id: string) {
    // const defaultPost : Post = {id: '-0' , content : 'n\a' , title : 'n\a'};
    // const post = this.posts.find(p => p.id === id) || { id: '-0', content: 'n\a', title: 'n\a' };


    //   return this.http.get<{ _id: string, title: string, content: string }>
    //     (this.basePath + '/posts/' + id);

    return { ...this.posts.find(p => p.id === id) };

  }

  addPost(title: string, content: string) {
    const post: Post = { id: "", title: title, content: content };

    this.http.post<{ message: string, postId: string, }>(this.basePath + "/posts/", post)
      .subscribe((responseData) => {
        console.log(responseData)
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);

        this.postsUpdate.next([...this.posts]);
        this.router.navigate(["/"]);
      });
  }


  updatedPost(id: string, title: string, content: string) {
    const post: Post = { id: id, title: title, content: content };
    this.http
      .put(this.basePath + '/posts/' + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);

        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;

        this.postsUpdate.next([...this.posts]);
        this.router.navigate(["/"]);
      });


  }

  deletePost(postId: string) {
    this.http.delete(this.basePath + '/posts/' + postId)
      .subscribe(() => {
        console.log("Deleted!");
        const updatePosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatePosts;
        this.postsUpdate.next(this.posts);
      });
  }

}
