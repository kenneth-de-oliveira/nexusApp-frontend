import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator-custom',
  templateUrl: './paginator-custom.component.html',
  styleUrls: ['./paginator-custom.component.scss']
})
export class PaginatorCustomComponent implements OnInit {

  @Input() items: Array<any>;
  @Input() itemsPerPage: number;
  @Input() stylesClass: '';
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  getTotalPerPage(page) {
    const start = (page.getCurrent() - 1) * this.itemsPerPage + 1;
    const end = Math.min(start + this.itemsPerPage - 1, page.getTotalItems());
    return end ? end : '0';
  }

}
