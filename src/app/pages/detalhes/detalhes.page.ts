import { PacienteService } from './../../services/paciente.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Paciente } from 'src/app/interfaces/paciente';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {


public paciente :Paciente = {};
private loading:  any;
private pacienteSubscription: Subscription;
public pacienteId: any;



  constructor(
    private PacienteService: PacienteService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private ToastCtrl:ToastController


  ) { 
    this.pacienteId = this.activatedRoute.snapshot.params["id"];
    if (this.pacienteId) this.loadPaciente();
  }

loadPaciente(){
  this.pacienteSubscription = this.PacienteService
  .getPaciente(this.pacienteId)
  .subscribe(data =>{
    this.paciente = data;
  })
}

  ngOnInit() {
  }

  async savePaciente(){
    await this.presentLoading();
    
    if(this.pacienteId){
      try{
          await this.PacienteService.updatePaciente(this.pacienteId, this.paciente);
          await this.loading.dimiss();

          this.navCtrl.navigateBack("/home");
      }catch(error){
        this.presentToast("Erro");
        this.loading.dimiss();
      }
    }else{
        //this.paciente.birthdate  = new Date().getTime();
        try{
          await this.PacienteService.addPaciente(this.paciente);
          console.error();
          await this.loading.dimiss();
          this.navCtrl.navigateBack("/home")
        
          
        }catch(error){
          this.presentToast("Erro Erro")
          this.loading.dimiss();
        }
    }
  }


  async presentLoading(){
    this.loading = await this.loadingCtrl.create({ message: "Aguarde....", duration:2000});
    return this.loading.present();
  }

  async presentToast(message: string){
    const toast =  await this.ToastCtrl.create({ message, duration: 2000});
    toast.present();
  }


}
