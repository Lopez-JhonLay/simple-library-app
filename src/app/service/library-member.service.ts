import { Injectable } from '@angular/core';
import { LibraryMember } from '../../models/library_member';

@Injectable({
  providedIn: 'root'
})
export class LibraryMemberService {
  members: LibraryMember[] = [];

  insertMember(member: LibraryMember) {
    this.members.push(member);

    alert(`Member "${member.name}" is added.`);
  }
}
