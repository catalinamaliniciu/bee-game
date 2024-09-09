import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BeeSwarmComponent } from './bee-swarm.component';
import { By } from '@angular/platform-browser';
import { Bee } from '../../models/bee.model';
import { BeeType } from '../../enums/bee-type.enum';
import { ComponentRef } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('BeeSwarmComponent', () => {
    let component: BeeSwarmComponent;
    let fixture: ComponentFixture<BeeSwarmComponent>;
    let componentRef: ComponentRef<BeeSwarmComponent>

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BeeSwarmComponent, BrowserAnimationsModule]
        }).compileComponents();

        fixture = TestBed.createComponent(BeeSwarmComponent);
        component = fixture.componentInstance;
        componentRef = fixture.componentRef
        componentRef.setInput('bees', [
            new Bee(1, BeeType.Queen, 100, 8),
            new Bee(2, BeeType.Worker, 75, 10),
            new Bee(3, BeeType.Drone, 50, 12)
        ]);

        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should display all bees', () => {
        const beeElements = fixture.debugElement.queryAll(By.css('p'));
        const beeTypeElements = fixture.debugElement.queryAll(By.css('h3'));
        expect(beeElements.length).toBe(3);

        expect(beeTypeElements[0].nativeElement.textContent).toContain('Queen');
        expect(beeElements[0].nativeElement.textContent).toContain('100');
        expect(beeTypeElements[1].nativeElement.textContent).toContain('Worker');
        expect(beeElements[1].nativeElement.textContent).toContain('75');
        expect(beeTypeElements[2].nativeElement.textContent).toContain('Drone');
        expect(beeElements[2].nativeElement.textContent).toContain('50');
    });

    it('should use trackById for *ngFor', () => {
        const trackByFn = component.trackById(0, component.bees()[0]);
        expect(trackByFn).toBe(1);
    });
});
