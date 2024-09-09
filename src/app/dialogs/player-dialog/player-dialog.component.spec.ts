import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlayerDialogComponent } from './player-dialog.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('PlayerDialogComponent', () => {
    let component: PlayerDialogComponent;
    let fixture: ComponentFixture<PlayerDialogComponent>;
    let mockDialogRef: jasmine.SpyObj<MatDialogRef<PlayerDialogComponent>>;
    let dialogData: { playerName: string };

    beforeEach(async () => {
        mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [
                PlayerDialogComponent,
                NoopAnimationsModule,
                FormsModule,
                MatButtonModule,
                MatInputModule,
                MatDialogModule
            ],
            providers: [
                {provide: MatDialogRef, useValue: mockDialogRef},
                {provide: MAT_DIALOG_DATA, useValue: {playerName: ''}}
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(PlayerDialogComponent);
        component = fixture.componentInstance;
        dialogData = TestBed.inject(MAT_DIALOG_DATA);

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display "Start new game" as the dialog title', () => {
        const titleElement = fixture.debugElement.query(By.css('h2')).nativeElement;
        expect(titleElement.textContent).toContain('Start new game');
    });

    it('should bind the input field to the playerName', async () => {
        const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;

        inputElement.value = 'Catalina';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(dialogData.playerName).toBe('Catalina');
    });

    it('should close the dialog with the player name when "Confirm" is clicked', () => {
        component.data.playerName = 'Catalina';
        fixture.detectChanges();

        const confirmButton = fixture.debugElement.query(By.css('button:first-of-type'))?.nativeElement;
        confirmButton?.click();

        expect(mockDialogRef.close).toHaveBeenCalledWith('Catalina');
    });
});
