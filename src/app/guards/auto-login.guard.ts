import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AutoLoginGuard implements CanLoad {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canLoad(): Observable<boolean> {
    return this.authService.isAuthenticated.pipe(
      filter((val) => val !== null), //filter out initial Behaviour Subject value
      take(1), //otherwise the observable doesn't complete
      map((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigateByUrl('/tabs', { replaceUrl: true });
        } else {
          return true;
        }
      })
    );
  }
}
