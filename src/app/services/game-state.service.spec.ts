import { TestBed } from '@angular/core/testing';
import { GameStateService } from './game-state.service';
import { BeeType } from '../enums/bee-type.enum';
import { Bee } from '../models/bee.model';

describe('GameStateService', () => {
    let service: GameStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GameStateService);
        service.initializeGame();
    });

    it('should initialize the game with default swarm', () => {
        const swarm: Bee[] = service.swarm();
        expect(swarm.length).toBe(14); // 1 Queen, 5 Workers, 8 Drones
        expect(swarm.find((bee: Bee) => bee.type === BeeType.Queen)?.health).toBe(100);
        expect(swarm.filter((bee: Bee) => bee.type === BeeType.Worker).length).toBe(5);
        expect(swarm.filter((bee: Bee) => bee.type === BeeType.Drone).length).toBe(8);
    });

    it('should hit a random bee and reduce its health', () => {
        spyOn(Math, 'random').and.returnValue(0);

        const initialHealth: number = service.swarm()[0].health;
        service.hitRandomBee();

        expect(service.swarm()[0].health).toBe(initialHealth - 8);
    });

    it('should kill the Queen and end the game', () => {
        spyOn(Math, 'random').and.returnValue(0);

        for (let i: number = 0; i < 13; i++) {
            service.hitRandomBee();
        }

        expect(service.isGameOver()).toBeTrue();
        expect(service.swarm()[0].health).toBe(0);
        expect(service.swarm().every((bee: Bee) => bee.health === 0)).toBeTrue();
    });

    it('should not hit any bees if the game is over', () => {
        service.endGame();

        const initialHealth = service.swarm()[0].health;
        service.hitRandomBee();

        expect(service.swarm()[0].health).toBe(initialHealth);
    });

    it('should set the username correctly', () => {
        service.setUsername('Catalina');
        expect(service.username()).toBe('Catalina');
    });

    it('should save and load the game state from localStorage', () => {
        service.setUsername('Catalina');
        service.hitRandomBee();

        const savedState = JSON.parse(localStorage.getItem('beeGameState')!);
        expect(savedState.username).toBe('Catalina');
        expect(savedState.swarm.length).toBe(14);

        service.loadGameState();
        expect(service.username()).toBe('Catalina');
        expect(service.swarm().length).toBe(14);
    });

});
