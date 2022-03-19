import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoadingCustomService } from './config/loading-custom.service';

@Component({
  selector: 'app-loading-custom',
  templateUrl: './loading-custom.component.html',
  styleUrls: ['./loading-custom.component.scss']
})
export class LoadingCustomComponent implements OnInit {

  public loading = false;

  constructor(private cdRef: ChangeDetectorRef,
              private loadService: LoadingCustomService) { }

  ngOnInit() {
    this.loadService.loading.subscribe(resp => {
      this.loading = resp;
      this.cdRef.detectChanges();
    });
  }

}
