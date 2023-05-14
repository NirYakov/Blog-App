import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';


const BACKEND_URL = environment.apiUrl + "/likes/";

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  myLikes: "";

  userLikes: string[] = [];

  constructor(private http: HttpClient, private router: Router) { }


  likePost(postId: string, isLike: boolean) {

    return this.http.post(BACKEND_URL + postId,
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
    return this.http.get<{ message: string, result: any[] }>(BACKEND_URL).pipe(map(result => { return { message: result.message, result: result.result.map(ary => ary.postId) } }))
      .subscribe({
        // next: (result: { message: string, result: [] }) => {
        next: (result: { message: string, result: [] }) => {
          console.log("im back here without data? ");
          console.log(result.result);
          console.log(result.message);

          this.userLikes = result.result;
          // this.updateLikesButtons();
        },
        error: error => console.log(error)
      });;
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
