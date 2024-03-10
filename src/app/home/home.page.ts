import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  username: string = '';
  password: string = '';
  userRole: string ='';
  showPassword = false;

  constructor(private navCtrl: NavController,
    private router: Router,
    private menu: MenuController,
    private menuCtrl: MenuController,
    private toastController: ToastController
    ) { }

  ngOnInit() {
    console.log()
    this.menu.enable(false);
  }



  ngOnDestroy() {
    this.menuCtrl.enable(true, 'menu1'); // Enable the menu with menuId 'menu1'
  }


  users =[
    {user: 'admin', password:'admin@123',role:'admin'},
    {user: 'supra', password:'supra@123',role:'field-operator'},
    {user: 'admin', password:'admin',role:'personal'}
  ];

  async login() {
    // Replace this with actual authentication logic
    const foundUser = this.users.find(user => user.user === this.username && user.password === this.password);
  
    if (foundUser) {
      localStorage.setItem("userRole", foundUser.role);
      localStorage.setItem("userName", foundUser.user);
      console.log('Authenticated User:', foundUser);
      // Authentication successful, navigate to the next page
      this.router.navigate(['/main-page']);
    } else {
      // Authentication failed, handle accordingly
      console.log('Authentication failed');
      await this.presentToast('Incorrect password. Please try again.');
    }
  }


  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000, // Show for 3 seconds
      position: 'top',
      color: 'danger', // Set the color to indicate an error
    });
    toast.present();
  }
  

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
