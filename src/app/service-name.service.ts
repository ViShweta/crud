import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ServiceNameService {


  handlerMessage = '';
  constructor(
    private alertController:AlertController
  ) { }

  async presentAlert(msg:any) {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: msg,
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        ],
      
    });

    await alert.present();
  }

}
