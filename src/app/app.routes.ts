import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { HomeComponent } from './pages/home/home.component';
import { PrimeComponent } from './pages/prime/prime.component';
import { RisultatiComponent } from './components/risultati/risultati.component';

export const routes: Routes = [
    {path: "admin", component: AdminComponent},
    {path: "quiz", component: QuizComponent},
    {path: "home", component: HomeComponent},
    {path: "risultati", component: RisultatiComponent},
    {path: "prime", component: PrimeComponent},
    {path: "", redirectTo: "home", pathMatch: "full"}
];
