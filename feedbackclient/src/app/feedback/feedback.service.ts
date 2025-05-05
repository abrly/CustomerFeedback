// src/app/services/feedback.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Feedback {
  ContNo: string;
  Remarks: string;
  name: string;
  feedbackText: string;
}

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {

  private apiUrl = `${environment.apiUrl}/feedback`; 


  constructor(private http: HttpClient) {}
 
    sendFeedback(data: any): Observable<any> {
      const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('X-HTTP-Method-Override', 'POST'); 
        
      return this.http.post(
        this.apiUrl, 
        data,
        { headers }
      );


    }
  
}
