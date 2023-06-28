import { Component } from '@angular/core';
import { LocalService } from './localstorage.service';
import { ItemReorderEventDetail } from '@ionic/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userlist: any = [];
  saveuser:any=[];
  listItems:any;
  reorderArray:any=[];

  user:any;
  constructor(
    private storage:LocalService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl:AlertController,
    private route:Router

  ) {



    

  }

  ionViewDidEnter() {
    this.UserData();
  }


  UserData(){
    this.userlist=JSON.parse(this.storage.getData('addUser') as string);
    this.saveuser=[...this.userlist]
    console.log(this.saveuser);

  }
  handleReorder(event: CustomEvent<ItemReorderEventDetail>) {
    console.log('Before complete', this.saveuser);
    const itemMove = this.saveuser.splice(event.detail.from, 1)[0];
    this.saveuser.splice(event.detail.to, 0, itemMove);
    event.detail.complete(true);
    console.log('After complete', this.saveuser);
    this.storage.saveData('addUser', JSON.stringify(this.saveuser));
  }


  
  async presentActionSheet(index:any,userdata:any) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteuser(index);
            console.log('user:',index)
          }
        },
        {
          text: 'edit',
          handler:() =>{
            this.route.navigate(['/signup/'+index], {state: userdata})
            console.log('userdata:',userdata);
            
          
          }
       
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  async deleteuser(user: any) {
    const alert = await this.alertCtrl.create({
      header: 'Alert!',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            alert.dismiss();
          },
        },
        {
          text: 'Okay',
          handler: () => {
            this.saveuser.splice(user, 1);
            this.storage.saveData('addUser', JSON.stringify(this.saveuser));
          },
        },
      ],
    });
    await alert.present();
  }
  

}

  

