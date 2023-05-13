import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


const BACKEND_URL = environment.apiUrl + "/likes/";

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  myLikes: "";

  constructor(private http: HttpClient, private router: Router) { }


  likePost(postId: string, isLike: boolean) {

    return this.http.post(environment.apiUrl + "/post/likes/" + postId,
      { isLike });

    // return this.http.post(BACKEND_URL + "like/" + postId,
    //   {
    //     isLike,
    //   }).subscribe(resultsData => {
    //     console.log("Yeah Back From Server!");
    //     console.log(resultsData);
    //   });
  }

  getUserLikes() {
    return this.http.get<{ message: string, result: any[] }>(BACKEND_URL);
    // return this.http.get<{ message: string, result: { postId, userLiked }[] }>(environment.apiUrl + "/likes");



    // .subscribe({
    //   next: (result: { message: string }) => {
    //     console.log("im back here without data? ");
    //     console.log(result);
    //   },
    //   error: error => console.log(error)
    // });

  }

}
