import { Component, OnInit } from '@angular/core';
import { SupplyChainDataService } from '../_services/supply-chain-data.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-smelter-manage-shipment',
  templateUrl: './smelter-manage-shipment.component.html',
  styleUrls: ['./smelter-manage-shipment.component.css']
})
export class SmelterManageShipmentComponent implements OnInit {
  viewDetails: boolean = false;
  records: Object[] = new Array();
  recordsMap: any = {};
  model: any = {}
  constructor(private scmDataService: SupplyChainDataService, private router: Router) {
    this.viewDetails = false;
    this.scmDataService.getShipmentByStatus('SHIPMENT_DELIVERED_TO_SMELTER').subscribe(payload => {

      this.records = JSON.parse(payload);
      for (var index = 0; index < this.records.length; index++) {
        var record = this.records[index]
        this.recordsMap[record['shipmentNumber']] = record;
      }

    }, err => {

      alert("No records found those are delivered and unprocessed");
    });
  }

  ngOnInit() {
  }
  viewShipmentDetails(shipmentNumber) {
    this.viewDetails = true;
    this.model = this.recordsMap[shipmentNumber];
  }
  receiveShipment() {
    var updatedRecord = {};
    updatedRecord['shipmentNumber'] = this.model.shipmentNumber
    updatedRecord['destRecvdWt'] = this.model.destRecvdWt
    updatedRecord['status'] = 'SHIPMENT_RECEIVED_BY_SMELTER'
    let hiddenWt = parseFloat(this.model.shipmentWt)
    let shipperWt = parseFloat(this.model.destRecvdWt + "")
    console.log("Hidewt" + hiddenWt)
    console.log("shipperWt" + shipperWt)
    if (hiddenWt < shipperWt) {
      alert("Received weight is above the limit")
    } else {
      this.scmDataService.updateShipment(updatedRecord).subscribe(message => {
        alert('Record  updated in Hyperledger Fabric ')
        this.router.navigate(['smelter/home']);
      }, err => {
        alert('Record could not be updated in Hyperledger Fabric ')
      });
    }
  }
}
