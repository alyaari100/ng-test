
 import { ConfirmationService, MessageService } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { FormBuilder,ReactiveFormsModule, FormGroup, FormsModule, Validators } from '@angular/forms';
 
 
 
import { UserService } from '../user.service';
import { Role, Status, User } from '../user-list/user';
import { InputTextModule } from 'primeng/inputtext';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-addEditUser',
  templateUrl: './addEditUser.component.html',
  standalone: true,
  styleUrls: ['./addEditUser.component.css'],
  providers:[MessageService,DialogService],

  imports: [FormsModule,CommonModule, InputTextModule,ReactiveFormsModule,DropdownModule,
    ButtonModule
  ]
})
 
export class AddEditUserComponent implements OnInit {
    form!: FormGroup;
  path = 'Finance.Budgets.';
  roles=[{label:"Admin",value:Role.admin},{label:"User",value:Role.user},{label:"Guest",value:Role.guest}];
  status=[{label:"Active",value:Status.active},{label:"In Active",value:Status.inActive}];
  editMode: boolean = false;
  editId?: any;

  //  formBuilder: any;
  constructor(
    private service: UserService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', Validators.required],
      status: ['', Validators.required],
    });
    this.ShowDailog(this.config.data.editMode, this.config.data.id);
  }

  onSave() {
    if (this.form.valid) {
      let formValues = this.form.value;
      const data = {
        name: formValues.name,
        email: formValues.email,
        role: formValues.role,
        status: formValues.status,
      } as User;

      this.service.addItem(data).subscribe({
        next: (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Record Updated Successfully',
          });
          this.ref.close(res);
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

  cancel() {
    this.ref.close();
 
  }
  ShowDailog(editMode: boolean, id?: string) {
    this.editMode = editMode;
    if (editMode && id) {
      this.service.getItemById(id).subscribe((res) => {
        if (res) {
          const item = res;
          this.editId = id;
          this.form.patchValue({
            name: item.name,
           // id: item.id,
            email: item.email,
            role: item.role,
            status: item.status,
            
          });
        }
      });
    } else {
      this.form.reset();
    }

    this.editMode = editMode;
  }
  translateKey(key: string): string {
    return   key;
  }
}
