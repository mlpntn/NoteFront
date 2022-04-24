import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {

  @Input('close') close: () => any;
  @Input('positiveText') positiveText: string;
  @Input('negativeText') negativeText: string;
  @Input('positive') positive: () => any;
  @Input('negative') negative: () => any;
  @Input('message') message: string;
  @Input('subMessage') subMessage: string;
  @Input('icon') icon: string = 'check';


  message2 = '';
  isSession : any;
  counter : any;
  constructor(private modal: ModalController) {}

  ngOnInit() {}


  runClose() {
    this.modal.dismiss()
      .then(r => { if(this.close) this.close() });
  }

  runPositive() {
    this.positive();
  }

  runNegative() {
    this.negative();
  }
}
