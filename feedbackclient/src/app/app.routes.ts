import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo:'feedback',
    pathMatch: 'full'  // <-- important to prevent partial matches
  },
    {
        path: 'feedback',
        loadComponent: () => import('./feedback/feedback.component').then(m => m.FeedbackComponent)
    }
];
