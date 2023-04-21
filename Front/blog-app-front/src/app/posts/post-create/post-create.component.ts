import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { PostsService } from "../posts.service";
import { Post } from "../../models/post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {

  theForm!: FormGroup;
  private mode = 'create';
  private postId: string = "";
  post!: Post;
  isLoading = false;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit(): void {

    this.theForm = new FormGroup(
      {
        'title': new FormControl(null, Validators.required),
        'content': new FormControl(null, Validators.required),
      });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId') || "";
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(thePost => {

          this.isLoading = false;

          if (thePost) {

            this.post =
            {
              id: thePost._id || "",
              title: thePost.title || "",
              content: thePost.content || "",
            }

            this.theForm.get('title')?.setValue(this.post.title);
            //  = this.post.title;
            this.theForm.get('content')?.setValue(this.post.content);

            console.log("this.post", this.post);
          }
        });
      } else {
        this.postId = "";
        this.mode = 'create';
      }
    });
  }

  onSavePost() {
    if (!this.theForm.valid) {
      return;
    }

    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addPost(this.theForm.value.title, this.theForm.value.content);

    }
    else {
      this.postsService.updatedPost(this.postId, this.theForm.value.title, this.theForm.value.content);
    }

    // console.log(this.theForm);
    this.theForm.reset(this.theForm);
  }

}
