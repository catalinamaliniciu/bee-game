import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-player-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatInputModule,
        FormsModule
    ],
    templateUrl: './player-dialog.component.html',
    styleUrl: './player-dialog.component.scss'
})
export class PlayerDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<PlayerDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { playerName: string; isConfirm: boolean }
    ) {
    }

    onConfirm(): void {
        this.dialogRef.close(this.data.playerName);
    }
}
