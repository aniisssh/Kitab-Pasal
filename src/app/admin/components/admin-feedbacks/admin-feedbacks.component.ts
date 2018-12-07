import { Router } from '@angular/router';
import { FeedbackService } from './../../../shared/services/feedback.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-feedbacks',
  templateUrl: './admin-feedbacks.component.html',
  styleUrls: ['./admin-feedbacks.component.css']
})
export class AdminFeedbacksComponent implements OnInit {

  feed$;

  constructor(
    private feedbackService: FeedbackService,
    private router: Router) {
      this.feed$ = feedbackService.getFeedbacks();
     }

     delete(id) {
      if (!confirm('Are you sure you want to delete this product?')) return;
  
      this.feedbackService.delete(id);
      this.router.navigate(['/admin/feedbacks']);
  
    }
  ngOnInit() {
  }

}
