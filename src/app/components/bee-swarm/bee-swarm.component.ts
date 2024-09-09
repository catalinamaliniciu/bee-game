import { Component, input, InputSignal } from '@angular/core';
import { Bee } from '../../models/bee.model';
import { KeyValue, KeyValuePipe, NgClass, NgForOf, NgIf, NgOptimizedImage } from '@angular/common';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { BeeType } from '../../enums/bee-type.enum';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-bee-swarm',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        MatCard,
        MatCardContent,
        MatGridList,
        MatGridTile,
        NgClass,
        NgOptimizedImage,
        MatCardHeader,
        KeyValuePipe
    ],
    templateUrl: './bee-swarm.component.html',
    styleUrl: './bee-swarm.component.scss',
    animations: [
        trigger('pulseAnimation', [
            state('active', style({
                transform: 'scale(1.1)',
                opacity: '0.7'
            })),
            state('inactive', style({
                transform: 'scale(1)',
                opacity: '1'
            })),
            transition('inactive <=> active', [
                animate('0.2s')
            ]),
            transition('active <=> inactive', [
                animate('0.2s')
            ])
        ])
    ]
})
export class BeeSwarmComponent {
    bees: InputSignal<Bee[]> = input<Bee[]>([]);
    lastHitBee: InputSignal<Bee | undefined> = input<Bee>();
    isGameOver: InputSignal<boolean> = input<boolean>(false);

    protected readonly BeeType = BeeType;

    trackById(index: number, bee: Bee): number {
        return bee.id;
    }

    getBeesByType(type: BeeType): Bee[] {
        return this.bees().filter((bee: Bee) => bee.type === type);
    }

    originalOrder = (a: KeyValue<string,string>, b: KeyValue<string,string>): number => {
        return 0;
    }
}
