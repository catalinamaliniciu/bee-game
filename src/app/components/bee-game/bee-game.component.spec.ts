import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeeGameComponent } from './bee-game.component';
import { By } from '@angular/platform-browser';
import { GameStateService } from '../../services/game-state.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BeeGameComponent', () => {
    let component: BeeGameComponent;
    let fixture: ComponentFixture<BeeGameComponent>;
    let gameStateService: GameStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GameStateService],
            imports: [BeeGameComponent, BrowserAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(BeeGameComponent);
        component = fixture.componentInstance;
        gameStateService = TestBed.inject(GameStateService);

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should call hitRandomBee when hit button is clicked', () => {
        spyOn(component, 'onHit');

        const hitButton = fixture.debugElement.query(By.css('button:first-of-type'));
        hitButton.triggerEventHandler('click', null);

        expect(component.onHit).toHaveBeenCalled();
    });

    it('should restart the game when restart button is clicked', () => {
        spyOn(component, 'openNameDialog');

        const restartButton = fixture.debugElement.query(By.css('button:last-of-type'));
        restartButton.triggerEventHandler('click', null);

        expect(component.openNameDialog).toHaveBeenCalled();
    });

    it('should display the username after setting it', () => {
        component.playerName = 'Catalina';
        component.onSetName();
        fixture.detectChanges();

        const usernameElement = fixture.debugElement.query(By.css('p'));
        expect(usernameElement.nativeElement.textContent).toContain('Catalina');
    });

});
