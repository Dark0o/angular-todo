import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-permission-denied',
  templateUrl: './permission-denied.component.html',
  styleUrls: ['./permission-denied.component.scss'],
})
export class PermissionDeniedComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }
}
