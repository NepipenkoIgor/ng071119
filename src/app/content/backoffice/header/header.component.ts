import {
  Component,
  Input, OnInit,
} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Store } from '@ngrx/store';
import { IStore } from '../../../store';
import { logoutPending } from '../../../store/actions/auth.actions';
import { trueTotalCount } from '../../../store/reducers/cart.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent  implements OnInit{

  @Input()
  public drawer: MatSidenav;

  @Input()
  public title = 'title';

  public isOpen = false;

  public totalCount$: Observable<number>;

  constructor(private store: Store<IStore>) {
  }

  public ngOnInit(): void {
    this.totalCount$ = this.store.select(trueTotalCount)
  }

  public rates: { value: number, currency: string }[] = [
    {value: 50, currency: 'USD'},
    {value: 65, currency: 'EUR'},
    {value: 3, currency: 'UAH'},
  ];

  public toggleSideNav() {
    this.drawer.toggle();
  }

  public logout(): void {
    this.store.dispatch(logoutPending());
  }
}
