export interface Risposta {
  testo: string;
  punteggio: string;
}

export interface Domanda {
  id: string;
  testo: string;
  risposte: Risposta[];
}