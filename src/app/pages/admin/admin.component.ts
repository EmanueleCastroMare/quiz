import { Component, OnInit} from '@angular/core';
import { Domanda } from '../../models/domande.model';
import { DomandeService } from '../../services/domande.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})


export class AdminComponent implements OnInit{
  
form: FormGroup;
//variabile che contiene le mmie domande
result: Domanda[] = [];
error = false;
submitted = false;


punteggiDisponibili = [0.2, 0, -0.1, -0.4]

// Opzioni disponibili per ogni select
  opzioni1: number[] = [];
  opzioni2: number[] = [];
  opzioni3: number[] = [];
  opzioni4: number[] = [];




//mostra messaggio in caso di corretto inserimento domanda o eliminazione
//mostra messaggio in caso di problemi di connessione
feedback = {
  message: "",
  type: "",
  visible: false
}

  
constructor(private domandeService: DomandeService, private fb: FormBuilder) {
  
  //inizializzazione del reactive form
  this.form = this.fb.group({
     domanda: ['', Validators.required],

      risposta1Testo: ['', Validators.required],
      risposta1Punteggio: [null, Validators.required],

      risposta2Testo: ['', Validators.required],
      risposta2Punteggio: [null, Validators.required],

      risposta3Testo: ['', Validators.required],
      risposta3Punteggio: [null, Validators.required],

      risposta4Testo: ['', Validators.required],
      risposta4Punteggio: [null, Validators.required],
  })

  
}


aggiornaOpzioni() {
  this.opzioni1 = this.getOpzioniDisponibili('risposta1Punteggio');
  this.opzioni2 = this.getOpzioniDisponibili('risposta2Punteggio');
  this.opzioni3 = this.getOpzioniDisponibili('risposta3Punteggio');
  this.opzioni4 = this.getOpzioniDisponibili('risposta4Punteggio');
}


getPunteggiSelezionati(): (number | null)[]{
  return [
    this.form.get("risposta1Punteggio")?.value,
    this.form.get("risposta2Punteggio")?.value,
    this.form.get("risposta3Punteggio")?.value,
    this.form.get("risposta4Punteggio")?.value,
  ]
}

getOpzioniDisponibili(currentField: string): number[] {
  const selezionati = this.getPunteggiSelezionati();
  console.log(selezionati)
  const currentValue = this.form.get(currentField)?.value;

  return this.punteggiDisponibili.filter(p =>
    !selezionati.includes(p) || p === currentValue
  );
}


//DELETE
delete(id:string):void {
    this.domandeService.deleteQuestion(id).subscribe({
      next: res => {
        this.feedback = {message: "Domanda Eliminata correttamente", type: "success", visible: true}
        this.caricaDomande();
        setTimeout(() => this.feedback.visible = false, 3000);
      }
    })
}


//SUBMIT e POST
onSubmit(){
  this.submitted = true;
  this.error = false;

  if(this.form.valid){

    const f = this.form.value;
    const output = {
      id: Math.floor(Math.random() * 10000).toString(),
      testo: f.domanda,
      risposte: [
          { testo: f.risposta1Testo, punteggio: f.risposta1Punteggio },
          { testo: f.risposta2Testo, punteggio: f.risposta2Punteggio },
          { testo: f.risposta3Testo, punteggio: f.risposta3Punteggio },
          { testo: f.risposta4Testo, punteggio: f.risposta4Punteggio },
      ],
    }
    this.domandeService.addQuestion(output).subscribe({
      next: res => {
        this.result = [...this.result, output] 
        this.form.reset()
        this.submitted = false;
        this.feedback = {message: "Domanda Aggiunta correttamente", type: "success", visible: true};
        setTimeout(() => this.feedback.visible = false, 3000);
      },
      error: (err) => {
        this.error = true;
        this.feedback = {message: "Problemi di connessione", type: "error", visible: true};
        setTimeout(() => this.feedback.visible = false, 3000);
      }
    })
  } else {
    this.form.markAllAsTouched()
  }
}


// GET
caricaDomande(): void {
  this.domandeService.getAll().subscribe(data => {
    this.result = data
  })
}



// inizializzazione della pagina
ngOnInit(): void {
    this.caricaDomande()

    this.form.valueChanges.subscribe(() => {
    this.aggiornaOpzioni();
  });

  this.aggiornaOpzioni(); // iniziale
  }
}