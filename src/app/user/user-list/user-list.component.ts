import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Role, Status, User } from './user';
import { UserService } from '../user.service';
import { ConfirmationService, MessageService } from 'primeng/api';
 import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
 import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AddEditUserComponent } from '../addEditUser/addEditUser.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone:true,
  imports: [TableModule, CommonModule,ToastModule,ButtonModule,DynamicDialogModule,
    DropdownModule,
    ConfirmDialogModule,
    FormsModule
  ],
  providers: [UserService,MessageService  ,DialogService,ConfirmationService],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
 
})
export class UserListComponent implements OnInit {
  selectedRole:any
  roles=[{label:"Admin",value:Role.admin},{label:"User",value:Role.user},{label:"Guest",value:Role.guest}];
  status=[{label:"Active",value:Status.active},{label:"In Active",value:Status.inActive}];
showAddEditDialog(item?: any, editMode: boolean = false) {
  const ref = this.dialogService.open(AddEditUserComponent, {
    header: editMode ? 'Edit Item' : 'Add Item',
    width: '40%',
    //  contentStyle: { 'max-height': '700px', 'overflow': 'visible' },
    styleClass: 'my-dialog',
    data: {
      editMode: editMode,
      id: editMode ? item.id : null,
    
    }, // Pass the data to the dynamic component
  });
  ref.onClose.subscribe((result?: any) => {
    // Handle the dialog result or emitted event data

    if (result) {
      if (editMode) {
        this.users.map((a) => {
          if (a.id == result.id) {
            a = result;
          }
        });
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Record Updated Successfully',
        });
      } else {
        this.users.unshift(result.item);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Record Added Successfully',
        });
      }
    } 
    // Perform any necessary actions
  });
}
  users!: User[];

  constructor(private service: UserService,private messageService: MessageService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
  ) {}

  confirmDelete(item: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.service.deleteItem(item.id).subscribe({
          next: () => {
            this.users = this.users.filter((a) => a !== item);

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Record Deleted Successfully',
            });
          },
          error: (error: any) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: error.message,
            });
          },
        });
      },
   
    });
  }
  ngOnInit() {
    this.service.getAll().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
    });
  }
   
  filterDataByRole(role:any){
    debugger
    this.service.filterDataByRole(role).subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (error: any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
        });
      },
    });
  }
}
