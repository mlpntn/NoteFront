import { Component } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { FormComponent } from '../components/form/form.component';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  notes = [];

  constructor(
    private modal: ModalController,
    private api: ApiService
  ) {

    this.getNotes();
    
  }

  getNotes(){
    this.api.getNotes().then(_ => {
      this.notes = _;
    }) 
  }

  new(){
    this.modal.create({
      component: FormComponent,
      cssClass: 'modal-narrow modal-popup',
      backdropDismiss:false, 
      componentProps:  { isAdd : true}         
    }).then(p => {

      p.onDidDismiss()
        .then(_ => this.getNotes())

      p.present()
      
    });
  }

  view(item){
    this.modal.create({
      component: FormComponent,
      cssClass: 'modal-narrow modal-popup',
      backdropDismiss:false,
      componentProps:  { item, isAdd : false}       
    }).then(p => {

      

      p.onDidDismiss()
        .then(data => {                      
          if(data.data) this.getNotes()
        })

 
        p.present();
    });
  }

}
