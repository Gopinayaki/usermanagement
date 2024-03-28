import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  // Define properties to store shared data
  private groupNames: string[] = [];
  private userGroupMap: Map<string, string[]> = new Map<string, string[]>();

  // Define BehaviorSubjects to emit updates
  private groupNamesSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  private userGroupMapSubject: BehaviorSubject<Map<string, string[]>> = new BehaviorSubject<Map<string, string[]>>(new Map<string, string[]>());

  constructor() { }

  // Methods to interact with shared data

  // Method to add a user to a group
  addUserToGroup(user: string, group: string): void {
    // Retrieve existing groups for the user
    let groups = this.userGroupMap.get(user) || [];
    // Add the group
    groups.push(group);
    // Update the user-group map
    this.userGroupMap.set(user, groups);
    // Emit update
    this.userGroupMapSubject.next(this.userGroupMap);
  }

  // Method to get group names for a user
  getGroupNamesForUser(user: string): Observable<string[]> {
    return new Observable<string[]>(observer => {
      // Retrieve groups for the user
      const groups = this.userGroupMap.get(user) || [];
      // Emit groups
      observer.next(groups);
      observer.complete();
    });
  }

  // Getter for group names subject
  get groupNames$(): Observable<string[]> {
    return this.groupNamesSubject.asObservable();
  }

  // Getter for user-group map subject
  get userGroupMap$(): Observable<Map<string, string[]>> {
    return this.userGroupMapSubject.asObservable();
  }
}
