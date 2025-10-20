import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './create-post/post';
import { PostDTO } from './create-post/post-dto';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  api : string = "http://chrisjhone.runasp.net/api/posts/";


  constructor( private http : HttpClient, private datePipe : DatePipe) { }

 uploadPost(post : PostDTO) {
  return this.http.post<any>(this.api + "upload-post", post, {
  headers: { 'Content-Type': 'application/json' }})
 }

 getAllPosts(){
  return this.http.get<any>(this.api + "get-posts")
 }

}
