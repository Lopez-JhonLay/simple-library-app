import { Injectable } from '@angular/core';
import { LibraryMember } from '../../models/library_member';

@Injectable({
  providedIn: 'root'
})
export class LibraryMemberService {
  members: LibraryMember[] = [];

  showAlert = false;

  alertMessage = '';

  insertMember(member: LibraryMember): boolean {
    this.members.push(member);
    
    return true;
  }
}
