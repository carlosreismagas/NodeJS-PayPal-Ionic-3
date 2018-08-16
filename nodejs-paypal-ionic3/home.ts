import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LoadingController } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, 
    private http: Http, 
    private iab: InAppBrowser, 
    private ionLoading: LoadingController) {
  }

  amount: any;
  pay(){
    let data = {
      amount: this.amount
    }

    let loader = this.ionLoading.create({
      content: 'Please Wait...'
    });

    loader.present();

    var headers = new Headers();
    headers.append("Accept", 'application/json');
    headers.append('Content-Type', 'application/json' );
    let options = new RequestOptions({ headers: headers });

    //send desired amount to server for payment

    this.http.post('http://localhost:3000/createPayment/', JSON.stringify(data), options)
    .map(res => res.json())

    //retrieve data and locate the returned link, open link using in-app-browser and approve payment.
    .subscribe(data => {
      console.log('Response From Server: ' + data.links[1].href);
      var browser = this.iab.create(data.links[1].href);
      loader.dismiss();
      this.amount = "";
    });
  }
}
