import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {
  contadorSignal = signal(10)

  incrementSig(value: number){
    this.contadorSignal.update((current)=> current + value)
  }

  
}
