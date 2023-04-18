import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm, Validators } from "@angular/forms";

import { PostsService } from "../posts.service";

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {

    theForm!: FormGroup;

    constructor(public postsService: PostsService) {

        this.theForm = new FormGroup(
            {
                'title': new FormControl(null, Validators.required),
                'content': new FormControl(null, Validators.required),
            });
    }

    ngOnInit(): void {

    }

    onAddPost() {
        if (!this.theForm.valid) {
            return;
        }

        console.log(this.theForm);
        this.postsService.addPost(this.theForm.value.title, this.theForm.value.content);
        this.theForm.reset(this.theForm);
    }

}