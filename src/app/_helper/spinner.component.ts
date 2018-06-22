import { Component, OnInit, ViewChild , EventEmitter} from '@angular/core';
import { NgbModal, ModalDismissReasons,NgbModalOptions, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { SupplyChainDataService } from '../_services/supply-chain-data.service'


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  closeResult: string;
  activeModal: NgbModalRef;
  
  @ViewChild('spinner') spinner;
    constructor(private modalService: NgbModal,private scmDataService: SupplyChainDataService) { 
     
    scmDataService.spinner.subscribe(state=>{
      if(state==true){
        this.openSpinner();
      }
      else{
        this.closeSpinner();
      }
    });
  }

  ngOnInit() {
  }

 openSpinner() {
    let opts:NgbModalOptions = {backdrop:'static',size:'sm'};
    console.log("Open Spinner");
    console.log(this.spinner);
    this.activeModal =this.modalService.open(this.spinner,opts);
    this.activeModal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
    
  }
  closeSpinner(){
    this.activeModal.close("Closed Programtically");
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
