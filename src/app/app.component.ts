import { Component } from '@angular/core';


@Component({
    selector: 'bs-app',
    template: '<h4>Input your name:</h4><input (keyup)="onKey($event)"><h1>Hello, {{values}}!</h1>'
})
export class AppComponent {
    values: string;

    onKey(event: any) {
        this.values = event.target.value;
    }
}
