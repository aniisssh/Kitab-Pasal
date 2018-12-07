import { Feedback } from './../models/feedback';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  placeFeedback(feedback) {
    let result = this.db.list('/feedback').push(feedback);
    return result;
  }

  getFeedbacks() {
    return this.db.list('/feedback')
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            const data = c.payload.val() as Feedback;
            data.$key = c.payload.key;
            return data;
          });
        }));
  }

  delete(feedId){
    return this.db.object('/feedback/' + feedId).remove();
  }

}
