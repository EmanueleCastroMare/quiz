import { Component,  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';


export interface City {
    name: string;
    code: string;
}

@Component({
  selector: 'app-prime',
  standalone: true,
  imports: [ReactiveFormsModule, MenubarModule, ButtonModule],
  templateUrl: './prime.component.html',
  styleUrl: './prime.component.css'
})



export class PrimeComponent{
  
 items: MenuItem[] | undefined;

   constructor(private router: Router) {}

 ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                command: () => {
                    this.router.navigate(['/home']);
                }
            },
            {
                label: 'Features',
                icon: 'pi pi-star',
                route: '/quiz'
            },
            
        ]
    }

}
