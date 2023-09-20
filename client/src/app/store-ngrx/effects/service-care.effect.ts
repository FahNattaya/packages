// import { Actions} from '@ngrx/effects';
// import { mergeMap, map } from 'rxjs';
// import { ServiceCareService } from 'src/app/shared/service/service-care.service';
// import { getMobileService, saveMobileCare } from '../actions/service-care.action';
import { Injectable } from '@angular/core';

@Injectable()
export class ServiceCareEffects {
//   constructor(
//     private actions$: Actions,
//     private serviceCareService : ServiceCareService
//   ) {}
//   loadModelMobileService$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(getMobileService),
//       mergeMap((action) =>
//         this.serviceCareService.getMobileCare(action.model).pipe(
//           map((data) => {
//             return saveMobileCare({ model: data.data });
//           })
//         )
//       )
//     )
//   );
}
