import { Paciente } from './../interfaces/paciente';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private pacienteCollection: AngularFirestoreCollection<Paciente>;
  constructor(private afs: AngularFirestore) {
    this.pacienteCollection = this.afs.collection<Paciente>("Pacientes");
   }

   getPacientes(){ 
     //aqui serve para listar todos os pacientes cadastrados
     return this.pacienteCollection.snapshotChanges().pipe(
       map(actions =>{ 
        return actions.map(a =>{ 
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ...data};
        })
       })
     )
   }


   //adicionar Paciente
   addPaciente(paciente: Paciente){
     return this.pacienteCollection.add(paciente);
   }

   getPaciente(id: string){
     return this.pacienteCollection.doc<Paciente>(id).valueChanges();
   }

   updatePaciente(id: string, paciente: Paciente){
     return this.pacienteCollection.doc<Paciente>(id).update(paciente);
   }

   deletePaciente(id: string){
     return this.pacienteCollection.doc(id).delete();
   }
}
