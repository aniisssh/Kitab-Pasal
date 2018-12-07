import { Feedback } from './../../../shared/models/feedback';
import { Component, OnInit } from '@angular/core';
import { AppUser } from 'shared/models/app-user';
import { Subscription } from 'rxjs';
import { AuthService } from 'shared/services/auth.service';
import { OrderService } from 'shared/services/order.service';
import { Router } from '@angular/router';
import { FeedbackService } from 'shared/services/feedback.service';

@Component({
  selector: 'my-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  appUser: AppUser;
  feedback: any = {};
  userId: string;
  userSubscription: Subscription;
  
  constructor( 
    private auth: AuthService,
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private router: Router) { }

    ngOnInit() {
      this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
      this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
    }

    ngOnDestroy() {
      this.userSubscription.unsubscribe();
    }

    placeFeedback(feedback) {
      let feed = new Feedback(this.userId, feedback);
      let result = this.feedbackService.placeFeedback(feed);
      this.router.navigate(['/feedback-success', result.key]);
    }
}
