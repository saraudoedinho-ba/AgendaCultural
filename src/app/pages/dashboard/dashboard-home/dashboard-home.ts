import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Client, Lead, BlockedDate } from '../../../interfaces/dashboard';

interface Show {
  id: number;
  date: string;
  client: string;
  location: string;
  status: 'completed' | 'scheduled' | 'cancelled';
}

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-home.html',
  styleUrl: './dashboard-home.css'
})
export class DashboardHome implements OnInit {
  // Shows data
  shows: Show[] = [];
  totalShows: number = 0;
  completedShows: number = 0;
  upcomingShows: number = 0;

  // Clients data
  clients: Client[] = [];
  totalClients: number = 0;

  // Leads data
  leads: Lead[] = [];
  newLeads: number = 0;

  // Blocked dates
  blockedDates: BlockedDate[] = [];

  // UI state
  activeTab: 'dashboard' | 'shows' | 'clients' | 'leads' | 'block-agenda' = 'dashboard';
  showBlockForm: boolean = false;
  newBlockDate: string = '';
  newBlockReason: string = '';
  calendarDays: (number | null)[] = [];
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();

  ngOnInit(): void {
    this.loadMockData();
    this.generateCalendar();
  }

  loadMockData(): void {
    this.shows = [
      {
        id: 1,
        date: '2026-06-15',
        client: 'Casamento Silva',
        location: 'Salão de Festas Centro',
        status: 'scheduled'
      },
      {
        id: 2,
        date: '2026-05-20',
        client: 'Festa de Aniversário',
        location: 'Residência Bairro Sul',
        status: 'completed'
      },
      {
        id: 3,
        date: '2026-07-10',
        client: 'Corporativo XYZ',
        location: 'Hotel Premium',
        status: 'scheduled'
      },
      {
        id: 4,
        date: '2026-06-05',
        client: 'Casamento Costa',
        location: 'Igreja e Salão',
        status: 'completed'
      }
    ];

    this.totalShows = this.shows.length;
    this.completedShows = this.shows.filter(s => s.status === 'completed').length;
    this.upcomingShows = this.shows.filter(s => s.status === 'scheduled').length;

    this.clients = [
      { id: 1, name: 'Família Silva', email: 'silva@email.com', phone: '(11) 98765-4321', shows: 2 },
      { id: 2, name: 'Corporativo XYZ', email: 'contato@xyz.com', phone: '(11) 3456-7890', shows: 1 },
      { id: 3, name: 'Família Costa', email: 'costa@email.com', phone: '(11) 99876-5432', shows: 1 },
      { id: 4, name: 'Eventos Premium', email: 'eventos@premium.com', phone: '(11) 3210-0987', shows: 3 }
    ];

    this.totalClients = this.clients.length;

    this.leads = [
      {
        id: 1,
        name: 'João Santos',
        email: 'joao@email.com',
        phone: '(11) 99999-8888',
        eventType: 'Casamento',
        date: '2026-08-15',
        status: 'new'
      },
      {
        id: 2,
        name: 'Maria Oliveira',
        email: 'maria@email.com',
        phone: '(11) 98888-7777',
        eventType: 'Aniversário',
        date: '2026-07-20',
        status: 'contacted'
      },
      {
        id: 3,
        name: 'Pedro Alves',
        email: 'pedro@email.com',
        phone: '(11) 97777-6666',
        eventType: 'Corporativo',
        date: '2026-09-10',
        status: 'interested'
      },
      {
        id: 4,
        name: 'Ana Paula',
        email: 'ana@email.com',
        phone: '(11) 96666-5555',
        eventType: 'Casamento',
        date: '2026-08-30',
        status: 'new'
      }
    ];

    this.newLeads = this.leads.filter(l => l.status === 'new').length;

    this.blockedDates = [
      { date: '2026-06-12', reason: 'Indisponível' },
      { date: '2026-06-25', reason: 'Manutenção de equipamentos' }
    ];
  }

  generateCalendar(): void {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    this.calendarDays = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      this.calendarDays.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      this.calendarDays.push(day);
    }
  }

  isDateBlocked(day: number | null): boolean {
    if (!day) return false;
    const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return this.blockedDates.some(bd => bd.date === dateStr);
  }

  blockDate(): void {
    if (this.newBlockDate && this.newBlockReason) {
      this.blockedDates.push({
        date: this.newBlockDate,
        reason: this.newBlockReason
      });
      this.newBlockDate = '';
      this.newBlockReason = '';
      this.showBlockForm = false;
      this.generateCalendar();
    }
  }

  unblockDate(date: string): void {
    this.blockedDates = this.blockedDates.filter(bd => bd.date !== date);
    this.generateCalendar();
  }

  previousMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  getMonthName(): string {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return months[this.currentMonth];
  }

  updateLeadStatus(lead: Lead, status: 'contacted' | 'interested'): void {
    lead.status = status;
  }

  deleteShow(id: number): void {
    this.shows = this.shows.filter(s => s.id !== id);
    this.totalShows = this.shows.length;
    this.completedShows = this.shows.filter(s => s.status === 'completed').length;
    this.upcomingShows = this.shows.filter(s => s.status === 'scheduled').length;
  }

  deleteLead(id: number): void {
    this.leads = this.leads.filter(l => l.id !== id);
    this.newLeads = this.leads.filter(l => l.status === 'new').length;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'scheduled':
        return 'status-scheduled';
      case 'new':
        return 'status-new';
      case 'contacted':
        return 'status-contacted';
      case 'interested':
        return 'status-interested';
      default:
        return '';
    }
  }

  getStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      completed: 'Realizado',
      scheduled: 'Agendado',
      cancelled: 'Cancelado',
      new: 'Novo',
      contacted: 'Contatado',
      interested: 'Interessado'
    };
    return labels[status] || status;
  }

  cancelSubscription(): void {
    const confirmed = confirm('Tem certeza que deseja cancelar sua assinatura? Você perderá acesso aos recursos premium.');
    if (confirmed) {
      alert('Assinatura cancelada com sucesso. Você ainda terá acesso até o final do período vigente.');
    }
  }
}
