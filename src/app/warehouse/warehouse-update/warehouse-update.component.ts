import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {WarehouseService} from "../service/warehouse.service";
import {Warehouse} from "../../models/warehouse.model";

@Component({
  selector: 'app-warehouse-update',
  templateUrl: './warehouse-update.component.html',
  styleUrls: ['./warehouse-update.component.css']
})
export class WarehouseUpdateComponent implements OnInit {
  id: bigint;
  warehouse: Warehouse;
  submitted = false;

  constructor(private route: ActivatedRoute,private router: Router,
              private warehouseService: WarehouseService,
              @Inject('BASE_API_URL') private baseUrl: string) { }

  ngOnInit() {
    this.warehouse = new Warehouse();
    this.id = this.route.snapshot.params['id'];

    this.warehouseService.getWarehouse(this.id)
      .subscribe(data => {
        console.log(data)
        this.warehouse = data;
      }, error => console.log(error));
  }

  updateWarehouse() {
    this.warehouseService.updateWarehouse(this.id, this.warehouse)
      .subscribe(data => console.log(data), error => console.log(error));
    this.warehouse = new Warehouse();
    this.gotoList();
  }

  onSubmit() {
    this.updateWarehouse();
    this.submitted = true;
  }

  gotoList() {
    this.router.navigate(['/home/(nav:warehouses']);
  }

}
