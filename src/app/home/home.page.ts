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
    const storedData = localStorage.getItem('usertable2');
    this.users = storedData ? JSON.parse(storedData) : this.users;
    

    console.log(storedData,this.users)
  }



  ngOnDestroy() {
    this.menuCtrl.enable(true, 'menu1'); // Enable the menu with menuId 'menu1'
  }


  users = [
    {username: 'admin', password:'admin@123',role:'super-admin', active: true, createdTime: "11-Apr-2024 14:48:42", createdby: "admin", designation: "ddd", emailid: "ddd", mobilenumber: "ddd"},
    {username: 'supra', password:'supra@123',role:'field-operator', active: true, createdTime: "11-Apr-2024 14:48:42", createdby: "admin", designation: "ddd", emailid: "ddd", mobilenumber: "ddd"},
    {username: 'admin', password:'admin',role:'personal', active: true, createdTime: "11-Apr-2024 14:48:42", createdby: "admin", designation: "ddd", emailid: "ddd", mobilenumber: "ddd"}
];


  async login() {
    // Replace this with actual authentication logic
    const foundUser = this.users.find(user => user.username === this.username && user.password === this.password);
  console.log(foundUser)
    if (foundUser) {
   localStorage.setItem("userRole", foundUser.role);
      localStorage.setItem("userName", foundUser.username);
      console.log('Authenticated User:', foundUser);
      // Authentication successful, navigate to the next page
      console.log('Authenticated User Role:', foundUser.role);
      this.router.navigate(['/main-page/usercomponmentcomp']);
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