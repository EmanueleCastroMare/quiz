import { Component, OnInit } from '@angular/core';
import { Domanda} from '../../models/domande.model';
import { DomandeService } from '../../services/domande.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent implements OnInit {

domande: Domanda[] = [];
domandaCorrente: Domanda | null = null;

indiceCorrente = 0;
punteggio: number  = 0;
quizIniziato = false;
quizTerminato = false;
messaggioRisultato= "";

selectedRispostaIndex: number | null = null;
risposteMostrate = false;


storicoRisposte: {
  domanda: string;
  rispostaUtente: string;
  rispostaCorretta: string;
  corretta: boolean;
}[] = [];


constructor(private domandeService: DomandeService) {}

avviaQuiz() {
  this.quizIniziato = true;
  this.indiceCorrente = 0
  this.domandaCorrente = this.domande[this.indiceCorrente];

}


rispostaSelezionata(index: number) {

  const domandaCorrente = this.domande[this.indiceCorrente];
  const rispostaSelezionata = domandaCorrente.risposte[index];
  const punteggioPreso = Number(rispostaSelezionata.punteggio);
  this.punteggio += punteggioPreso;
  this.punteggio = Number(this.punteggio.toFixed(2))
  console.log(this.punteggio)

  this.selectedRispostaIndex = index;
  this.risposteMostrate = true;

  // Trova risposta corretta (con punteggio massimo > 0)
  const rispostaCorretta = domandaCorrente.risposte.reduce((best, curr) => {
    return Number(curr.punteggio) > Number(best.punteggio) ? curr : best;
  });

  // Salva nello storico
  this.storicoRisposte.push({
    domanda: domandaCorrente.testo,
    rispostaUtente: rispostaSelezionata.testo,
    rispostaCorretta: rispostaCorretta.testo,
    corretta: rispostaSelezionata.testo === rispostaCorretta.testo
  });

  
}

prossimaDomanda(){
  this.selectedRispostaIndex = null;
  this.risposteMostrate = false;

  if(this.indiceCorrente < this.domande.length - 1){
    this.indiceCorrente++;
     this.domandaCorrente = this.domande[this.indiceCorrente];
  } else {
    this.quizTerminato = true;
    this.domandaCorrente = null
    this.mostraRisultato()
  }
}

mostraRisultato(){
  this.punteggio = Number(this.punteggio.toFixed(2))
  if (this.punteggio >= 6)  {
    this.messaggioRisultato = "Congratulazioni! hai superato l'esame!"
  } else {
    this.messaggioRisultato = "Hai fallito il quiz"
  }
}


ngOnInit(): void {
  this.domandeService.getAll().subscribe(data => {
    this.domande = data;
  })
}

}
