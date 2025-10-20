import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { IntroComponent } from './intro/intro.component';

export const routes: Routes = [
    {path: '', component: IntroComponent},
    { path: 'main', component: MainComponent }
];
