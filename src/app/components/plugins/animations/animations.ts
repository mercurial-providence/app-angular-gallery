import { transition, style, animate, state, group } from '@angular/animations';

export function fadeIn() {
    return [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('1000ms ease-in', style({ opacity: 1 }))
        ]),
        transition(':leave', [
            style({ opacity: 1 }),
            animate('1000ms ease-out', style({ opacity: 0 }))
        ])
    ];
}

export function slideInOut() {
    return [
        state('in', style({ height: '*', opacity: 0 })),
        transition(':leave', [
            style({ height: '*', opacity: 1 }),

            group([
                animate(300, style({ height: 0 })),
                animate('200ms ease-in-out', style({ 'opacity': '0' }))
            ])

        ]),
        transition(':enter', [
            style({ height: '0', opacity: 0 }),

            group([
                animate(300, style({ height: '*' })),
                animate('400ms ease-in-out', style({ 'opacity': '1' }))
            ])

        ])
    ];
}