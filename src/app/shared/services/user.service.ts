import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from 'shared/models/app-user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private db: AngularFireDatabase) { }

  saveUser(user: firebase.User) {
    this.db.object('/users/'+ user.uid).update({
      name: user.displayName,
      email:user.email
    })
  }

  get(uid: string): Observable<any>{
    return this.db.object('/users/' + uid).valueChanges();
  }
}
