import { Component, OnInit ,HostListener } from '@angular/core';
import { Router } from '@angular/router'
import { RandomUtil } from '../_helper/random-util.helper'
import { SupplyChainDataService } from '../_services/supply-chain-data.service'

@Component({
  selector: 'app-mine-create-shipment',
  templateUrl: './mine-create-shipment.component.html',
  styleUrls: ['./mine-create-shipment.component.css']
})
export class MineCreateShipmentComponent implements OnInit {
  model:any={};
  constructor(private service:SupplyChainDataService,private router:Router) {
    this.model['type']='Ore';
    this.model['oreType']='Ferberite';
    this.model['shipType']='Rail';
    this.model['shipmentNumber']=RandomUtil.generateRandomUUID([3,3,3]);
    this.model['date']=RandomUtil.getToday();
   }

  ngOnInit() {
  }
@HostListener('window:keyup', ['$event'])
  genRandomData($event) {
    if ($event.keyCode == 71 && $event.ctrlKey){
      console.log("We are here CTRL+ G Pressed")
     /*
      this.model.currentItem.qty=100;
      this.model.currentItem.boxBarcodeNumber=RandomUtil.generateRandomUUID([3,3,3]);
      this.model.currentItem.debitMemo=RandomUtil.generateRandomUUID([5,2]);
      this.model.currentItem.lotNumber=RandomUtil.generateRandomUUID([4,4,4]);
      this.model.currentItem.dc=RandomUtil.generateRandomUUID([3,4]);
      this.model.currentItem.ndc=RandomUtil.generateRandomUUID([5,2,3]);
      this.model.currentItem.expDate=RandomUtil.generateRandomDateString(30);
      this.model.currentItem.purchageOrderNumber=RandomUtil.generateRandomUUID([6,2]);;
      this.model.currentItem.remarks="TEST remarks on "+ this.model.currentItem.product.id;
      */
      this.model['srcMine'] = RandomUtil.pickFromList(['Mine 1','Mine 2', 'Mine 3']);
      this.model['shipmentWt'] = RandomUtil.pickFromList(['2000','4000','5000','7000']);
      this.model['shipingComp'] = RandomUtil.pickFromList(['COMP 1','COMP 2','COMP 3']);
      this.model['sealNumber'] = RandomUtil.generateRandomUUID([6,2]);
      this.model['contractNumber'] = RandomUtil.generateRandomUUID([8,2]);
      this.model['expYield'] = Math.random()*10+"";
      this.model['shipDest'] = RandomUtil.pickFromList(['Smelter 1','Smelter 2','Smelter 3']);
   
    }
  }
  initShipment(){
    console.log(JSON.stringify(this.model));
    this.model['shipSrc']='MINE COMPANY 1'
    this.service.createNewShipment(this.model).subscribe(status => {
      alert("Shipment created successfully in Hyplerledger Fabric ")
      this.router.navigate(['mine/home']);
    }, err => {
       alert("Shipment could not be create in Hyplerledger Fabric ")
    });
  }

}
