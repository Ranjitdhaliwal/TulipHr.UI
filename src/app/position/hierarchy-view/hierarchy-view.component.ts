import { Component, OnInit } from '@angular/core';
import { PositionService } from '../../service/position.service';
import { StatusService } from '../../util/status.service';
import { TreeNode } from 'primeng/api';  

@Component({
  selector: 'app-hierarchy-view',
  templateUrl: './hierarchy-view.component.html',
  styleUrls: ['./hierarchy-view.component.scss']
})

export class HierarchyViewComponent implements OnInit {
  dataSource!: TreeNode[];
  constructor(private _posService: PositionService,
    private _statusService: StatusService
  ) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }
  getEmployeeList() {
    this._posService.getTree().subscribe({
      next: (res) => {
        this.dataSource = [res];
      },
      error: (err: any) => {
        this._statusService.openSnackBar(`Error : ${err.error}`);
        console.log('error', err);
      }
    });
  }
}
