import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'feedback',
        loadComponent: () => import('./feedback/feedback.component').then(m => m.FeedbackComponent)
      }
];
