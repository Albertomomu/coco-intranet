import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {
  constructor(
    private actionSheetController: ActionSheetController,
    private router: Router
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
            this.router.navigate(['/create-user']);
          },
        },
        {
          text: 'Editar Usuario',
          icon: 'create',
          handler: () => {
            // Aquí puedes agregar tu código para abrir una pantalla de "Editar Usuario"
            console.log('Editar Usuario');
          },
        },
        {
          text: 'Eliminar Usuario',
          icon: 'trash',
          handler: () => {
            // Aquí puedes agregar tu código para abrir una pantalla de "Eliminar Usuario"
            console.log('Eliminar Usuario');
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
}
