import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormComponent } from './form/form.component';
import { ConfirmComponent } from './confirm/confirm.component';


@NgModule({
    declarations: [
        FormComponent,
        ConfirmComponent
        
    ],
    imports: [
        CommonModule,
        IonicModule,
        ReactiveFormsModule,
        FormsModule

    ],
    exports: [
        FormComponent,
        ConfirmComponent
    ],
    entryComponents: [
        FormComponent,
        ConfirmComponent
    ],
    providers: [
        DatePipe      
    ]
})
export class ComponentsModule { }
