import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { PostService } from '../post.service';
import { Post } from '../create-post/post';
import { FreedomWallServiceService } from '../freedom-wall-service.service';
@Component({
  selector: 'app-main',
  imports: [CommonModule,RouterLink],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements OnInit {

    postList : Post[] = []
    isLoading = false

constructor(private route : Router, private matdialog : MatDialog, 
            private service : PostService, private datePipe : DatePipe,
            private wallpostService : FreedomWallServiceService){}
  ngOnInit(): void {
    this.isLoading = true
    this.service.getAllPosts().subscribe(data =>{
      this.postList = data as Post[]
      this.isLoading = false;
    })
    this.wallpostService.startConnection();
    this.wallpostService.hubConnection.on('newPost', (post) => {
      this.postList.unshift(post); 
    });
    
    
  }

 formatDate(rawDate: string): string | null {
  return this.datePipe.transform(rawDate, 'MMMM d, y h:mm a');
}
  
    
 
}
