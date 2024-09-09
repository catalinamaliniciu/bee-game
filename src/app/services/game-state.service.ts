import { computed, Injectable, Signal, signal } from '@angular/core';
import { Bee } from '../models/bee.model';
import { BeeType } from '../enums/bee-type.enum';

@Injectable({
    providedIn: 'root'
})
export class GameStateService {
    private _swarm = signal<Bee[]>([]);
    private _lastHitBee = signal<Bee | undefined>(undefined);
    private _isGameOver = signal(false);
    private _username = signal<string>('');

    swarm: Signal<Bee[]> = computed(() => this._swarm());
    isGameOver: Signal<boolean> = computed(() => this._isGameOver());
    lastHitBee: Signal<Bee | undefined> = computed(() => this._lastHitBee());
    username: Signal<string> = computed(() => this._username());

    constructor() {
        this.loadGameState();
    }

    setUsername(name: string): void {
        this._username.set(name);
        this._saveGameState();
    }

    initializeGame(): void {
        this._isGameOver.set(false);
        let id: number = 1;
        const initialSwarm: Bee[] = [
            new Bee(id++, BeeType.Queen, 100, 8),
            ...Array(5).fill(null).map(() => new Bee(id++, BeeType.Worker, 75, 10)),
            ...Array(8).fill(null).map(() => new Bee(id++, BeeType.Drone, 50, 12))
        ];
        this._swarm.set(initialSwarm);
        this._saveGameState()
    }

    hitRandomBee(): void {
        if (this._isGameOver()) return;

        const aliveBees: Bee[] = this._swarm().filter((bee: Bee) => !bee.isDead());
        if (aliveBees.length === 0) {
            this.endGame();
            return;
        }

        const randomBee: Bee = aliveBees[Math.floor(Math.random() * aliveBees.length)];
        randomBee.takeDamage();

        this._swarm.update((bees: Bee[]) => bees.map((bee: Bee) => bee.id === randomBee.id ? randomBee : bee));
        this._lastHitBee.set(randomBee);
        if (randomBee.type === BeeType.Queen && randomBee.isDead()) {
            this.endGame();
        }
        this._saveGameState();
    }

    clearGameState(): void {
        localStorage.removeItem('beeGameState');
    }

    loadGameState(): void {
        const savedState: string | null = localStorage.getItem('beeGameState');
        if (savedState) {
            const {swarm, isGameOver, username} = JSON.parse(savedState);
            this._swarm.set(swarm.map((bee: any) => new Bee(bee.id, bee.type, bee.health, bee.damage)));
            this._isGameOver.set(isGameOver);
            this._username.set(username);
        } else {
            this.initializeGame();
        }
    }

    endGame(): void {
        this._isGameOver.set(true);
        this._swarm.update((bees: Bee[]) => bees.map((bee: Bee) => ({...bee, health: 0} as Bee)));
        this._lastHitBee.set(undefined);
        this._saveGameState();
    }

    private _saveGameState(): void {
        const gameState = {
            swarm: this._swarm().map((bee: Bee) => ({
                id: bee.id,
                type: bee.type,
                health: bee.health,
                damage: bee.damage
            })),
            isGameOver: this._isGameOver(),
            username: this._username()
        };
        localStorage.setItem('beeGameState', JSON.stringify(gameState));
    }
}
