import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/interfaces/paciente';
import { Subscription } from 'rxjs';
import { PacienteService } from 'src/app/services/paciente.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  

  public pacientes = new Array<Paciente>();
  private pacienteSubscription : Subscription;

  constructor(
               private pacienteService: PacienteService,
               private toastCtrl: ToastController
    ) {

    this.pacienteSubscription = this.pacienteService
    .getPacientes()
    .subscribe(data =>{
      this.pacientes = data;
    });
  }

  ngOnInit(){
    
  }

ngOnDestroy() {
  // destroi o ouvinte quando muda a pagina
  this.pacienteSubscription.unsubscribe();
}

async deletePaciente(id:string){
  try{
    await this.pacienteService.deletePaciente(id);
  }catch(error){
    this.presentToast("Erro ao tentar deletar");
  }
}

async presentToast(message: string){
  const toast = await this.toastCtrl.create({message, duration:2000 });
  toast.present();
}


}
