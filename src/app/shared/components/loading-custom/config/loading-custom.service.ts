import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingCustomService {
  private loadingSubject: Subject<boolean> = new Subject();

  public loading = this.loadingSubject.asObservable();

  subscribeLoading(sucessHandler, errorHandler?) {
    return this.loadingSubject.subscribe(sucessHandler, errorHandler);
  }

  show() {
    this.loadingSubject.next(true);
  }

  hidden() {
    this.loadingSubject.next(false);
  }
}
