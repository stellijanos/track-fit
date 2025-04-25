import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GlobalMessageComponent } from "./shared/components/global-message/global-message.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalMessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Track-Fit';
}
