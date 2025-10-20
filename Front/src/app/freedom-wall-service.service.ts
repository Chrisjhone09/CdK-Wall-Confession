import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { Post } from './create-post/post';
import { PostDTO } from './create-post/post-dto';
@Injectable({
  providedIn: 'root'
})
export class FreedomWallServiceService {
  public hubConnection!: signalR.HubConnection;
  private wallPostsSubject = new BehaviorSubject<any[]>([]);
  public wallPosts$ = this.wallPostsSubject.asObservable();
  private posts: any[] = [];
  
  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://chrisjhone.runasp.net/wallUpdates')
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('FreedomWall connected'))
      .catch(err => console.error('SignalR error:', err));

    this.hubConnection.on('newPost', (post) => {
      this.posts.unshift(post); 
      this.wallPostsSubject.next(this.posts);
    });
  }

  uploadPost(post : PostDTO) {
    this.hubConnection.invoke('postToWall', post).catch(err => console.log(err))
  }
}
