import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../services/client.service';
import { NgFor, NgIf } from '@angular/common';
import { Client } from '../interfaces/client';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ClientFormComponent } from '../client-form/client-form.component';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, SidebarComponent, ClientFormComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  clients: Client[] = [];
  searchForm: FormGroup;
  advancedSearchForm: FormGroup;
  newClientForm: FormGroup;
  showNewClientModal = false;
  showAdvancedSearch = false;

  constructor(
    private clientService: ClientService,
    private fb: FormBuilder,
    private logger: LoggingService
  ) {
    this.searchForm = this.fb.group({
      sharedKey: ['']
    });

    this.advancedSearchForm = this.fb.group({
      businessId: [''],
      phone: [''],
      email: [''],
      dateAdded: [''],
      endDate: ['']
    });

    this.newClientForm = this.fb.group({
      businessId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      dateAdded: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.logger.log('ClientsComponent initialized');
  }

  ngOnInit(): void {
    this.logger.log('ngOnInit: Fetching clients');
    this.getClientes();
  }

  getClientes(): void {
    this.logger.log('Fetching all clients...');
    this.clientService.getClientes().subscribe(
      (data: Client[]) => {
        this.clients = data;
        this.logger.log('Clients fetched successfully', this.clients);
      },
      (error) => {
        this.logger.error('Error fetching clients', error);
      }
    );
  }

  searchClientes(): void {
    const sharedKey = this.searchForm.get('sharedKey')?.value;
    this.logger.log(`Searching for clients with sharedKey: ${sharedKey}`);
    this.clientService.searchClientes(sharedKey).subscribe(
      (data: Client[]) => {
        this.clients = data;
        this.logger.log('Clients fetched by sharedKey', this.clients);
      },
      (error) => {
        this.logger.error('Error searching clients', error);
      }
    );
  }

  toggleNewClientModal(): void {
    this.showNewClientModal = !this.showNewClientModal;
    this.logger.log('Toggled new client modal:', this.showNewClientModal);
  }

  toggleAdvancedSearch(): void {
    this.showAdvancedSearch = !this.showAdvancedSearch;
    this.logger.log('Toggled advanced search form:', this.showAdvancedSearch);
  }

  createClient(): void {
    if (this.newClientForm.valid) {
      this.logger.log('Creating new client...', this.newClientForm.value);
      this.clientService.createCliente(this.newClientForm.value).subscribe(
        () => {
          this.logger.log('Client created successfully');
          this.getClientes();
          this.toggleNewClientModal();
          this.newClientForm.reset();
        },
        (error) => {
          this.logger.error('Error creating client', error);
        }
      );
    } else {
      this.logger.warn('New client form is invalid');
    }
  }

  advancedSearch(): void {
    if (this.advancedSearchForm.valid) {
      const searchParams = this.advancedSearchForm.value;
      this.logger.log('Performing advanced search with parameters:', searchParams);
      this.clientService.advancedSearch(searchParams).subscribe(
        (data: Client[]) => {
          this.clients = data;
          this.logger.log('Clients fetched by advanced search', this.clients);
        },
        (error) => {
          this.logger.error('Error performing advanced search', error);
        }
      );
    } else {
      this.logger.warn('Advanced search form is invalid');
    }
  }
}
