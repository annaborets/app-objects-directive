import { Component } from '@angular/core';

@Component({
  selector: 'app-objects-output',
  templateUrl: './objects-output.component.html',
  styleUrls: ['./objects-output.component.scss']
})
export class ObjectsOutputComponent {
  public data = {
    user: {
      personalData: {
        name: {
          name: 'Anna',
          surname: {
            surname: 'B'
          }
        },
        age: {
          age: 10,
          age2: {
            age2: 12
          }
        }
      }
    }
  };
}
