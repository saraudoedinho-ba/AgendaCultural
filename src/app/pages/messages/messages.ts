import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Ticket {
  id: number;
  number: string;
  title: string;
  message: string;
  lastUpdate: string;
  status: 'open' | 'closed' | 'pending';
}

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages implements OnInit {
  tickets: Ticket[] = [];
  filteredTickets: Ticket[] = [];
  searchTerm: string = '';

  showModal: boolean = false;
  novoTitulo: string = '';
  novaMensagem: string = '';
  nextTicketId: number = 1;

  ngOnInit(): void {
    this.loadMockData();
  }

  loadMockData(): void {
    // Empty by default as shown in the reference
    this.tickets = [];
    this.filteredTickets = [...this.tickets];
  }

  filterTickets(): void {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredTickets = [...this.tickets];
      return;
    }
    this.filteredTickets = this.tickets.filter(ticket =>
      ticket.title.toLowerCase().includes(term) ||
      ticket.number.toLowerCase().includes(term)
    );
  }

  abrirModal(): void {
    this.showModal = true;
    this.novoTitulo = '';
    this.novaMensagem = '';
  }

  fecharModal(): void {
    this.showModal = false;
    this.novoTitulo = '';
    this.novaMensagem = '';
  }

  salvarChamado(): void {
    const titulo = this.novoTitulo.trim();
    const mensagem = this.novaMensagem.trim();

    if (!titulo) {
      alert('Digite o título do chamado.');
      return;
    }

    if (!mensagem) {
      alert('Digite a mensagem do chamado.');
      return;
    }

    const now = new Date();
    const ticketNumber = `CHAM-${String(this.nextTicketId).padStart(4, '0')}`;

    const newTicket: Ticket = {
      id: this.nextTicketId,
      number: ticketNumber,
      title: titulo,
      message: mensagem,
      lastUpdate: now.toISOString(),
      status: 'open'
    };

    this.tickets.unshift(newTicket);
    this.nextTicketId++;
    this.filterTickets();
    this.fecharModal();
  }
}
