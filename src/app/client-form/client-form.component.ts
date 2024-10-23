import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  @Input() newClientForm!: FormGroup;
  @Output() createClient = new EventEmitter<void>();
  @Output() toggleNewClientModal = new EventEmitter<void>();

  onSubmit(): void {
    this.createClient.emit();
  }

  onCancel(): void {
    this.toggleNewClientModal.emit();
  }
}
