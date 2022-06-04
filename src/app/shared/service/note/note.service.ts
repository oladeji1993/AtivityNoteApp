import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { NoteModel } from 'src/app/models/note.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  refresh = new BehaviorSubject<any>(null);
  baseUrl = environment.serverUrl;


  constructor(
    private http : HttpClient,
  ) { }

  getNote(){
    return this.http.get(`${this.baseUrl}/note/`);
  };

  createNote(note: NoteModel){
    return this.http.post(`${this.baseUrl}/note/`, note);
  };

  updateNote(note: NoteModel, id: number){
    return this.http.put<any>(`${this.baseUrl}/note/`+id, note)
    .pipe(map((res:any) => {
      return res;
  }))
}

  deleteNote(id: number){
    return this.http.delete<any>(`${this.baseUrl}/note/`+id)
    .pipe(map((res:any) => {
      return res;
  }))
}

}
