import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { MainComponent } from './main/main.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Front';
  constructor(private matdialog : MatDialog){

  }

createPost() {
  this.matdialog.open(CreatePostComponent, {
    height: '550px',
    width: '500px'

  })
}
}
