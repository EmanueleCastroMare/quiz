import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { GiocatoriService } from '../../services/giocatori.service';
import { Giocatore } from '../../models/giocatori.models';
import { SortEvent } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-risultati',
  standalone: true,
  imports: [TableModule, InputTextModule, DropdownModule, MultiSelectModule],
  templateUrl: './risultati.component.html',
  styleUrl: './risultati.component.css'
})
export class RisultatiComponent implements OnInit{

  @ViewChild('dt') dt! : Table ;
  initialValue: Giocatore[]  = [];
  isSorted: boolean | null = null;



 constructor(private giocatoriService: GiocatoriService) {}

 giocatori: Giocatore[] = [];

ngOnInit(): void {
  this.caricaGiocatore()
}

 customSort(event: SortEvent) {
        if (this.isSorted == null || this.isSorted === undefined) {
            this.isSorted = true;
            this.sortTableData(event);
        } else if (this.isSorted == true) {
            this.isSorted = false;
            this.sortTableData(event);
        } else if (this.isSorted == false) {
            this.isSorted = null;
            this.giocatori = [...this.initialValue];
            this.dt.reset();
        }
    }

    sortTableData(event: SortEvent) {
     if (!event.data) {
        return; // esci se mancano dati fondamentali
      }

        event.data.sort((data1: any, data2: any) => {
            if (!event.field) {
                return 0; // No field to sort by
            }
            let value1 = data1[event.field as keyof typeof data1];
            let value2 = data2[event.field as keyof typeof data2];
            let result = null;
            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            const order = event.order ?? 1;
            return order * result;
        });
    }




caricaGiocatore(){this.giocatoriService.getAll().subscribe({
    next: (data) => {
      this.giocatori = data;
      this.initialValue = [...data];
    },
    error: err => {
      console.log(err)
    }
  })

}


deleteUser(id:string):void {
  this.giocatoriService.deleteGiocatore(id).subscribe({
    next: res => {
        this.caricaGiocatore(); 
      }
  })
}
 
}
