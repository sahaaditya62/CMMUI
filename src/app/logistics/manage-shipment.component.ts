import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { SupplyChainDataService } from '../_services/supply-chain-data.service'
import { RandomUtil } from '../_helper/random-util.helper'

@Component({
  selector: 'app-manage-shipment',
  templateUrl: './manage-shipment.component.html',
  styleUrls: ['./manage-shipment.component.css']
})
export class ManageShipmentComponent implements OnInit {
  viewDetails: boolean = false;
  recordList: Object[] = new Array();
  recordsMap: any = {}
  model: any = {}
  searchStatus:string ="SHIPMENT_INITIATED_FROM_MINE"
  editEnabled : boolean = true;

  constructor(private scmDataService: SupplyChainDataService, private router: Router,private route: ActivatedRoute) {
    this.searchStatus = this.route.snapshot.data['status'];
    this.editEnabled = this.route.snapshot.data['canEdit'];
    this.viewDetails = false;
    this.scmDataService.getShipmentByStatus(this.searchStatus).subscribe(payload => {
      var payloadArray = JSON.parse(payload);
      this.recordList = payloadArray;
      for (var index = 0; index < this.recordList.length; index++) {
        var rec = this.recordList[index];
        this.recordsMap[rec['shipmentNumber']] = rec
      }

    }, err => {
      alert("Could not retive the records")
    })
  }

  ngOnInit() {
  }

  viewShipmentDetails(shipmentNumber) {
    this.viewDetails = true;
    console.log(shipmentNumber)
    console.log(JSON.stringify(this.recordsMap[shipmentNumber]))
    var record = this.recordsMap[shipmentNumber]
    this.model=record;
  }
  acceptShipment() {

    var updatedRecord = {};
    updatedRecord['vehicleId'] = this.model.vehicleId;
    updatedRecord['shipperRecvdWt'] = this.model.shipperRecvdWt
    updatedRecord['shipmentNumber'] = this.model.shipmentNumber
    updatedRecord['status'] = 'SHIPMENT_ACKNOWLEDGED'
    let hiddenWt = parseFloat(this.model.shipmentWt)
    let shipperWt  = parseFloat(this.model.shipperRecvdWt+"")
    console.log("Hidewt"+ hiddenWt)
    console.log("shipperWt"+ shipperWt)
    
    if(hiddenWt<shipperWt ){
      alert("Weight received is above the limit")
    }else{
      this.scmDataService.updateShipment(updatedRecord).subscribe(message => {
        alert('Record  updated in Hyperledger Fabric ')
        this.router.navigate(['logistics/home']);
      }, err => {
        alert('Record could not be updated in Hyperledger Fabric ')
      });
    }
  }

  deliverShipment(){
    var updatedRecord = {};
    updatedRecord['shipmentNumber'] = this.model.shipmentNumber
    updatedRecord['status'] = 'SHIPMENT_DELIVERED_TO_SMELTER'
    this.scmDataService.updateShipment(updatedRecord).subscribe(message => {
      alert('Record  updated in Hyperledger Fabric ')
      this.router.navigate(['logistics/home']);
    }, err => {
      alert('Record could not be updated in Hyperledger Fabric ')
    });
  }
}
