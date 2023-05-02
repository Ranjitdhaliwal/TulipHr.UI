import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatusService } from '../../util/status.service';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.scss']
})
export class EmployeeManageComponent implements OnInit {
  empForm: FormGroup;



  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmployeeManageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _statusService: StatusService
  ) {
    this.empForm = this._fb.group({
      id: '',
      firstName: '',
      lastName: '',
      number: '',
      positionId: '',
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this._empService
          .update(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this._statusService.openSnackBar('Employee information has been updated successful!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              this._statusService.openSnackBar(`Error : ${err.error}`);
              console.log('error', err);
            },
          });
      } else {
        this._empService.create(this.empForm.value).subscribe({
          next: (val: any) => {
            this._statusService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            this._statusService.openSnackBar(`Error : ${err.error}`);
            console.error(err);
          },
        });
      }
    }
  }
}
