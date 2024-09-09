import { BeeType } from '../enums/bee-type.enum';

export class Bee {

    constructor(
        public id: number,
        public type: BeeType,
        public health: number,
        public damage: number
    ) {}

    takeDamage = (): void => {
        this.health -= this.damage;
        if (this.health <= 0) this.health = 0;
    }

    isDead = (): boolean => {
        return this.health <= 0;
    }
}
