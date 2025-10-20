import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Post } from './post';
import { PostService } from '../post.service';
import { PostDTO } from './post-dto';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FreedomWallServiceService } from '../freedom-wall-service.service';
@Component({
  selector: 'app-create-post',
  imports: [CommonModule, MatDialogModule, FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  post : PostDTO = new PostDTO();
  isLoading: boolean = false;

  constructor(private service : PostService, private dialogRef : MatDialogRef<CreatePostComponent>, 
              private route : Router, private wallpost : FreedomWallServiceService){}
  uploadPost(){
    this.isLoading = true;
    this.service.uploadPost(this.post).subscribe({
    next: (response) => {
      this.isLoading = false
      this.dialogRef.close(); 
      this.wallpost.uploadPost(this.post)
      this.route.navigate(['/main'])
    },
    error: (err) => {
      console.error('Upload failed', err);
    }
  });
    
  }



}
