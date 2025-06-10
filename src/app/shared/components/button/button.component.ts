import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reusable-button',
  templateUrl: './button.component.html',
  standalone: false,
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() text: string = 'Button';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled: boolean = false;
  @Input() variant: 'default' | 'submit' | 'delete' | 'comment' = 'default';

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}
