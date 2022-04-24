import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ValidatorUtilities } from 'src/app/validators/ValidatorUtilities';
import { ApiService } from 'src/app/services/api.service';
import Compressor from 'compressorjs';
import { __await } from 'tslib';
import { ConfirmComponent } from '../confirm/confirm.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent extends ValidatorUtilities implements OnInit {

  @ViewChildren("img", { read: ElementRef }) private img: QueryList<any>;
  @ViewChild("content") _el: ElementRef;
  
  @Input("item") item;
  @Input("isAdd") isAdd;

  public validationMessages = {
 
    title: [
        { type: 'required', message: 'Title is required' },
    ],
    description: [
      { type: 'required', message: 'Description is required' },
    ],
    content: [
      { type: 'required', message: 'Content is required' },
    ],
    
  };

  addAttachments = false;
  idTypes: any = [];
  submitTry = false;

  constructor(private formBuilder: FormBuilder,
            private api: ApiService,
            private modal: ModalController,
            private modal2: ModalController
            )
            { 
              super();
              this.createForm();
            }

  ngOnInit() {
   
    if(!this.isAdd){
      this.validators.get('add.title').setValue(this.item.title);
      this.validators.get('add.description').setValue(this.item.description);
      this.validators.get('add.content').setValue(this.item.contents);

      let oldAttachments = this.validators.get('add.Attachments').value;        
      oldAttachments.base64 = 'https://localhost:44332' + this.item.image;
      this.validators.get('add.Attachments').setValue(oldAttachments);

    }

  }

  createForm() {
    this.validators = this.formBuilder.group({
      add: new FormGroup({
        title: new FormControl('', Validators.compose([
            Validators.required,
        ])),
        description: new FormControl('', Validators.compose([
            Validators.required,
        ])),
        content: new FormControl('', Validators.compose([
            Validators.required,
        ])),
        Attachments: new FormControl([
          {
              AttachmentIdName: '',
              IdTypeId: '',
              base64: ''
          },      
      ]),
      })
    });
  }

  addAttachment() {
     this.validators.value.add.Attachments.push({
         AttachmentTypeId: '',
         AttachmentName: 'Attachment Name',
         base64: ''
     });
 }

  onPressUploadImage(event) {
    this.img.toArray()[0].nativeElement.click();
  }

  async uploadImage(event) {
    const reader = new FileReader();
    let file = event.target.files[0];

    reader.addEventListener('load', (img) => {
        let result = reader.result;
        var context = this;     
        new Compressor(file, {
            quality: 0.9,
            maxWidth: 1000,
            success(result) {
              const reader = new FileReader();
                let base64DataURL;
                reader.onload = (e: any) => {

                  base64DataURL = e.target.result;
                  let oldAttachments = context.validators.get('add.Attachments').value;        
                  oldAttachments.base64 = base64DataURL;
                  context.validators.get('add.Attachments').setValue(oldAttachments);

                };
    
                reader.readAsDataURL(result)

            },
            error(err) {
            },
          });
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }

    this._el.nativeElement.focus();
    
  }

  add(){
    this.validate(this.validators);
    if (this.validators.valid){
      
      this.modal2.create({
        component: ConfirmComponent,
        cssClass: 'modal-wide modal-popup',
        componentProps: {
            message: 'Are you sure you want to continue adding note?',
            icon: 'question',
            positive: () => {
              const data = this.validators.value;
              var obj = {
                title: data.add.title,
                description: data.add.description,
                contents: data.add.content,
                image: data.add.Attachments.base64      
              }
              this.api.addNotes(obj).then(_ => this.modal.dismiss()); 
              this.modal2.dismiss(); 
            },
            negative: () => {
              this.modal2.dismiss();
            },
        }
        }).then(p => {
            p.present();
        });
    }
    
    
  }

  update() {

    this.validate(this.validators);
    if (this.validators.valid){

      this.modal2.create({
        component: ConfirmComponent,
        cssClass: 'modal-wide modal-popup',
        componentProps: {
            message: 'Are you sure you want to continue updating note?',
            icon: 'question',
            positive: () => {
                const data = this.validators.value;
                var image = data.add.Attachments.base64;
            
                if(!image.includes("Attachments")){
                  image = this.item.image;
                }
            
                var obj = {
                  id: this.item.id,
                  title: data.add.title,
                  description: data.add.description,
                  contents: data.add.content,
                  image: data.add.Attachments.base64     
                }
            
                this.api.updateNotes(obj).then(_ => this.modal.dismiss(true));
                this.modal2.dismiss();
            },
            negative: () => {
              this.modal2.dismiss();
            },
        }
        }).then(p => {
            p.present();
        });
    }
    
  }

  delete() {
    this.modal2.create({
      component: ConfirmComponent,
      cssClass: 'modal-wide modal-popup',
      componentProps: {
          message: 'Are you sure you want to continue deleting note?',
          icon: 'question',
          positive: () => {
           
            this.api.deleteNotes(this.item.id).then(_ => this.modal.dismiss(true));
            this.modal2.dismiss();
          },
          negative: () => {
            this.modal2.dismiss();
          },
      }
      }).then(p => {
          p.present();
      });
     
  }


  close(){
    this.modal2.create({
      component: ConfirmComponent,
      cssClass: 'modal-wide modal-popup',
      componentProps: {
          message: 'Are you sure you want to continue?',
          icon: 'question',
          positive: () => {

            this.modal2.dismiss();
            this.modal.dismiss(false);

          },
          negative: () => {
            this.modal2.dismiss();
          },
      }
      }).then(p => {
          p.present();
      });
   
  }

}
