import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-test';
  // tableData: any[] = [
  //   { name: 'John', email: 'john@example.com' },
  //   { name: 'Jane', email: 'jane@example.com' },
  // ];
  tableColumns: string[] = ['name', 'email'];

  onAddClick() {
    // Handle add click logic
  }

  onEditClick(data: any) {
    // Handle edit click logic
  }

  onDeleteClick(data: any) {
    // Handle delete click logic
  }

  onFormSubmit(formData: any) {
    // Handle form submit logic
  }
}
// <app-dynamic-table [data]="tableData" [columns]="tableColumns" (addClick)="onAddClick()" (editClick)="onEditClick($event)" (deleteClick)="onDeleteClick($event)">
//       <app-dynamic-form (formSubmit)="onFormSubmit($event)">
// <ng-template>
      

//       <h1>Hi Abdulmalik</h1>
      
// </ng-template>
//       </app-dynamic-form>
//     </app-dynamic-table>