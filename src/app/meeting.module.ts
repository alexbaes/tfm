import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { CreateComponent } from './pages/meeting/create/create.component';
import { EditComponent } from './pages/meeting/edit/edit.component';
import { IndexComponent } from './pages/meeting/index/index.component';
import { ShareComponent } from './pages/meeting/share/share.component';
import { ShowComponent } from './pages/meeting/show/show.component';
import { PopUpComponent } from './pages/shared/pop-up/pop-up.component';

@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent,
    EditComponent,
    ShowComponent,
    ShareComponent,
    PopUpComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
})
export class MeetingModule {}
