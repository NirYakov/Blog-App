import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';
import { PostsService } from '../posts.service';
import { Subscription, map } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';
import { LikesService } from '../likes.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;


  isLiked = false;

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private likesService: LikesService
  ) { }


  onClickedLike(post: Post) {

    console.log("userid that logged in is : ", this.authService.getUserId());

    this.likesService.likePost(post.id, post.isLiked)
      .subscribe((resultsData: { message: string, likes: number, isLiked: boolean }) => {
        console.log("Yeah Back From Server!");
        console.log(resultsData);
        post.likes = resultsData.likes;
        post.isLiked = resultsData.isLiked;
      });


  }

  updateLikesButtons() {

    this.likesService.userLikes.forEach(val => {
      const post = this.posts.find(post => post.id === val);
      if (post) {
        post.isLiked = true;
      }
    });
  }


  ngOnInit() {
    this.isLoading = true;
    this.likesService.getUserLikes();
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService
      .getPostUpdateListener()
      .subscribe((postData: { posts: Post[], postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
        this.updateLikesButtons();
      });

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener().subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }, () => { this.isLoading = false });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
