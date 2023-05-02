import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { getAuth } from 'firebase/auth';
import { AuthService } from 'src/app/core/auth/auth.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  async manageUsers() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Gestionar Usuarios',
      buttons: [
        {
          text: 'Añadir Usuario',
          icon: 'person-add',
          handler: () => {
            // Aquí puedes agregar tu código para abrir una pantalla de "Añadir Usuario"
            this.router.navigate(['/admin-dashboard/create-user']);
          },
        },
        {
          text: 'Editar Usuario',
          icon: 'create',
          handler: () => {
            // Aquí puedes agregar tu código para abrir una pantalla de "Editar Usuario"
            const user = getAuth().currentUser;
            console.log(user);
            this.router.navigate(['/edit-user']);
          },
        },
        {
          text: 'Eliminar Usuario',
          icon: 'trash',
          handler: () => {
            // Aquí puedes agregar tu código para abrir una pantalla de "Eliminar Usuario"
            this.router.navigate(['/admin-dashboard/delete-user']);
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
        },
      ],
    });
    await actionSheet.present();
  }

  manageDocuments() {
    this.router.navigate(['/admin-dashboard/documents']);
  }

  logout() {
    this.auth.signOut();
    this.router.navigate(['/home']);
  }
}
