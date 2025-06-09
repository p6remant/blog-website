import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string, duration = 3000) {
    this.snackBar.open(message, 'Close', {
      duration,
      verticalPosition: 'top',
      panelClass: ['toast-success'],
    });
  }

  error(message: string, duration = 3000) {
    this.snackBar.open(message, 'Close', {
      duration,
      verticalPosition: 'top',
      panelClass: ['toast-error'],
    });
  }
}
