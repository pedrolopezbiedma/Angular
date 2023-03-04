import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  serverElements = [{ name: 'Test Server', type: 'server', content:'Test Content'}];

  onServerCreated(createdServer: { name: string, content: string}) {
    this.serverElements.push({
      type: 'server',
      name: createdServer.name,
      content: createdServer.content
    });
  }

  onBlueprintCreated(createdBlueprint: { name: string, content: string}) {
    this.serverElements.push({
      type: 'blueprint',
      name: createdBlueprint.name,
      content: createdBlueprint.content
    });
  }
}
