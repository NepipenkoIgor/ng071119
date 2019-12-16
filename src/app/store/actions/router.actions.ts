import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export interface IRouterPayload {
  path: string[];
  query?: object;
  extras?: NavigationExtras;
}

export const go = createAction(
  '[Router] GO',
  props<{ payload: IRouterPayload }>()
);

export const forward = createAction(
  '[Router] FORWARD'
);

export const back = createAction(
  '[Router] BACK',
);
