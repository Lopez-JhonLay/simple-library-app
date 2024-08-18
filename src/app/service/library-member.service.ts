import { Injectable } from '@angular/core';
import { LibraryMember } from '../../models/library_member';

@Injectable({
  providedIn: 'root'
})
export class LibraryMemberService {
  members: LibraryMember[] = JSON.parse(localStorage.getItem('members') || '[]');

  showAlert = false;

  alertMessage = '';

  insertMember(member: LibraryMember): boolean {
    this.members.push(member);
    localStorage.setItem('members', JSON.stringify(this.members));
    return true;
  }
}
