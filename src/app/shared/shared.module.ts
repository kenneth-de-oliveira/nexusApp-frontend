import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { NgxPaginationModule } from 'ngx-pagination';
import { AlertCustomComponent } from './components/alert-custom/alert-custom.component';
import { LoadingCustomInterceptor } from './components/loading-custom/config/loading-custom-interceptor';
import { LoadingCustomComponent } from './components/loading-custom/loading-custom.component';
import { PaginatorCustomComponent } from './components/paginator-custom/paginator-custom.component';
import { TableBodyDirective } from './components/table-custom/config/table-body.directive';
import { TableEmptyDirective } from './components/table-custom/config/table-empty.directive';
import { TableHeaderDirective } from './components/table-custom/config/table-header.directive';
import { TableCustomComponent } from './components/table-custom/table-custom.component';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { UpperCaseDirective } from './directives/upper-case.directive';
import { HttpErrorInterceptor } from './interceptor/http-error.interceptor';

@NgModule({
  declarations: [
    AlertCustomComponent,
    LoadingCustomComponent,
    PaginatorCustomComponent,
    TableCustomComponent,
    TableHeaderDirective,
    TableBodyDirective,
    TableEmptyDirective,
    UpperCaseDirective,
    OnlyNumberDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgxPaginationModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBorderRadius: '0px',
      fullScreenBackdrop: true,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      primaryColour: '#dc3545',
      secondaryColour: '#dc3545',
      tertiaryColour: '#dc3545'
    }),
  ],
  exports: [
    LoadingCustomComponent,
    TableCustomComponent,
    TableHeaderDirective,
    TableBodyDirective,
    TableEmptyDirective,
    PaginatorCustomComponent,
    UpperCaseDirective,
    AlertCustomComponent,
    OnlyNumberDirective,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingCustomInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
