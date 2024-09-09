import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BeeGameComponent } from './components/bee-game/bee-game.component';
import { MatToolbar } from '@angular/material/toolbar';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, BeeGameComponent, MatToolbar, NgOptimizedImage],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title: string = 'bee-game';
}
