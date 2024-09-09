import { Component } from '@angular/core';
import { GameStateService } from '../../services/game-state.service';
import { NgOptimizedImage } from '@angular/common';
import { BeeSwarmComponent } from '../bee-swarm/bee-swarm.component';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { PlayerDialogComponent } from '../../dialogs/player-dialog/player-dialog.component';
import { Bee } from '../../models/bee.model';

@Component({
    selector: 'app-bee-game',
    standalone: true,
    imports: [
        BeeSwarmComponent,
        FormsModule,
        MatCard,
        MatCardTitle,
        MatCardContent,
        MatFormField,
        MatButton,
        MatInput,
        MatLabel,
        NgOptimizedImage
    ],
    templateUrl: './bee-game.component.html',
    styleUrl: './bee-game.component.scss',
    animations: [
        trigger('buttonPress', [
            state('normal', style({transform: 'scale(1)'})),
            state('pressed', style({transform: 'scale(0.95)'})),
            transition('normal <=> pressed', animate('100ms ease-in'))
        ])
    ]
})
export class BeeGameComponent {
    message: string = '';
    playerName: string = '';
    buttonState: string = 'normal';

    constructor(
        public gameState: GameStateService,
        private _dialog: MatDialog) {}

    onHit(): void {
        this.gameState.hitRandomBee();
        this._updateMessage();
    }

    onSetName(): void {
        this.gameState.setUsername(this.playerName);
    }

    onRestart(): void {
        this.gameState.clearGameState();
        this.gameState.initializeGame();
        this.message = '';
    }

    private _updateMessage(): void {
        if (this.gameState.isGameOver()) {
            this.message = 'Game Over!';
        } else {
            const lastHitBee: Bee | undefined = this.gameState.lastHitBee();
            if (lastHitBee) {
                this.message = `You hit a ${lastHitBee.type}, remaining health: ${lastHitBee.health}`;
            }
        }
    }

    openNameDialog(isRestart: boolean = false): void {
        const dialogRef = this._dialog.open(PlayerDialogComponent, {
            data: {playerName: isRestart ? this.gameState.username() : ''},
            width: '40%'
        });

        dialogRef.afterClosed().subscribe((name: string | undefined): void => {
            if (name) {
                this.gameState.setUsername(name);
                if (isRestart) {
                    this.onRestart();
                }
            }
        });
    }
}
