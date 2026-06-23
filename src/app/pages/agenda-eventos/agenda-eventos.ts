 

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MusicosService, MusicoAPI } from '../../services/musicos.service';
import { ArtistasSearchService, ArtistaSearchResult } from '../../services/artistas-search.service';
import { HeaderComponent } from '../../components/header/header';

interface BookingEvent {
  id: string;
  date: string;
  period: string;
  full_name: string;
  phone: string;
  email: string;
  address: string;
  duration: string;
  guests: string;
  service_value: string;
  sound_rental: string;
  sound_value: string;
}

@Component({
  selector: 'app-agenda-eventos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderComponent],
  templateUrl: './agenda-eventos.html',
  styleUrl: './agenda-eventos.css',
})
export class AgendaEventos implements OnInit {
  usuario = '';
  carregando = true;
  musico: Partial<MusicoAPI | ArtistaSearchResult> = {};
  pagamentoRealizado = false;

  allEvents: BookingEvent[] = [];
  selectedDate: string | null = null;
  selectedDay = 0;
  selectedMonth = new Date().getMonth();
  selectedYear = new Date().getFullYear();
  selectedPeriod: string | null = null;
  selectedTime: string | null = null;
  timePanelVisible = false;

  months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  years: number[] = [];
  calendarCells: Array<{ empty: boolean; day?: number; dateStr?: string; booked?: boolean; today?: boolean; selected?: boolean }> = [];

  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  toastVisible = false;
  toastTimeout: any;

  bookingForm = {
    fName: '',
    fPhone: '',
    fEmail: '',
    fAddress: '',
    fDuration: '',
    fGuests: '',
    fServiceValue: '',
    fSound: '',
    fSoundValue: ''
  };

  durationOptions = [
    { value: '3 horas', label: '3h - R$200', price: 200 },
    { value: '4 horas', label: '4h - R$500', price: 500 },
    { value: '6 horas', label: '6h - R$900', price: 900 },
    { value: '8 horas', label: '8h - R$1.900', price: 1900 }
  ];

  guestsOptions = [
    { value: '10 a 50', label: '10-50', price: 200, soundPrice: 400 },
    { value: '50 a 100', label: '50-100', price: 300, soundPrice: 600 },
    { value: '100+', label: '100+', price: 400, soundPrice: 1200 },
    { value: 'Negociar', label: 'Negociar', price: 0, soundPrice: 0 }
  ];

  soundOptions = [
    { value: '10 a 50', label: '10-50 R$400', price: 400 },
    { value: '50 a 100', label: '50-100 R$600', price: 600 },
    { value: '100+', label: '100+ R$1.200', price: 1200 },
    { value: 'Negociar', label: 'Negociar', price: 0 }
  ];

  periods = [
    { key: 'MANHÃ', time: '08:00 às 11:00', icon: '☀️' },
    { key: 'TARDE', time: '13:00 às 16:00', icon: '🌤️' },
    { key: 'NOITE', time: '18:00 às 21:00', icon: '🌙' }
  ];

  get musicianLabel(): string {
    return this.musico?.musNomeArtistico ? `Músico: ${this.musico.musNomeArtistico}` : 'Músico: ' + (this.usuario || 'Artista');
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private musicosService: MusicosService,
    private artistasSearchService: ArtistasSearchService
  ) {}

  ngOnInit() {
    const artistaId = Number(this.route.snapshot.paramMap.get('id'));

    if (artistaId) {
      this.carregarArtista(artistaId);
    } else {
      if (!this.authService.isLogado()) {
        this.router.navigate(['/login']);
        return;
      }
      this.usuario = localStorage.getItem('usuario') || '';
      this.pagamentoRealizado = localStorage.getItem('pagamentoRealizado') === 'true';
      this.carregarPerfil();
    }

    this.initYears();
    this.loadEvents();
    this.generateCalendar();
  }

  carregarArtista(id: number) {
    this.carregando = true;
    this.artistasSearchService.buscarPorId(id).subscribe({
      next: (artista) => {
        this.musico = artista;
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
        this.router.navigate(['/encontrar-artista']);
      }
    });
  }

  carregarPerfil() {
    this.carregando = true;
    const email = localStorage.getItem('userEmail') || this.usuario;

    this.musicosService.getMusicosRaw().subscribe({
      next: (musicos) => {
        const encontrado = musicos.find(m => m.musEmail === email);
        if (encontrado) {
          this.musico = { ...encontrado };
          localStorage.setItem('musicoId', String(encontrado.id));
        }
        this.carregando = false;
      },
      error: () => {
        this.carregando = false;
      }
    });
  }

  initYears() {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y <= currentYear + 3; y++) {
      this.years.push(y);
    }
  }

  loadEvents() {
    const raw = localStorage.getItem('agendaEvents');
    this.allEvents = raw ? JSON.parse(raw) : [];
  }

  saveEvents() {
    localStorage.setItem('agendaEvents', JSON.stringify(this.allEvents));
  }

  generateCalendar() {
    this.calendarCells = [];
    const firstDay = new Date(this.selectedYear, this.selectedMonth, 1).getDay();
    const daysInMonth = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    const today = new Date();

    for (let i = 0; i < firstDay; i++) {
      this.calendarCells.push({ empty: true });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${this.selectedYear}-${String(this.selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const booked = this.allEvents.some(e => e.date === dateStr);
      const isToday = today.getFullYear() === this.selectedYear && today.getMonth() === this.selectedMonth && today.getDate() === day;
      const selected = this.selectedDate === dateStr;
      this.calendarCells.push({ empty: false, day, dateStr, booked, today: isToday, selected });
    }
  }

  onMonthYearChange() {
    this.selectedDate = null;
    this.selectedPeriod = null;
    this.selectedTime = null;
    this.timePanelVisible = false;
    this.generateCalendar();
  }

  selectDate(cell: { empty: boolean; dateStr?: string; day?: number }) {
    if (cell.empty || !cell.dateStr) {
      return;
    }
    this.selectedDate = cell.dateStr;
    this.selectedDay = cell.day || 0;
    this.selectedPeriod = null;
    this.selectedTime = null;
    this.timePanelVisible = false;
    this.generateCalendar();
  }

  isPeriodBooked(periodKey: string): BookingEvent | undefined {
    return this.allEvents.find(event => event.date === this.selectedDate && event.period === periodKey);
  }

  selectPeriod(periodKey: string) {
    if (!this.selectedDate) {
      this.showToast('Selecione uma data primeiro.', 'error');
      return;
    }

    const booked = this.isPeriodBooked(periodKey);
    if (booked) {
      this.showToast('Este período já está agendado.', 'error');
      return;
    }

    this.selectedPeriod = periodKey;
    const period = this.periods.find(p => p.key === periodKey);
    this.selectedTime = period ? period.time : null;
    this.timePanelVisible = true;
  }

  selectTime() {
    if (!this.selectedPeriod || !this.selectedDate) {
      this.showToast('Selecione um período.', 'error');
      return;
    }
    this.showToast(`${this.selectedPeriod} - ${this.selectedTime} selecionado!`, 'success');
  }

  get selectedPeriodTitle(): string {
    if (!this.selectedDate) {
      return 'Selecione uma data';
    }
    const day = String(this.selectedDay).padStart(2, '0');
    return `${day} de ${this.months[this.selectedMonth]} de ${this.selectedYear}`;
  }

  get formDateLabel(): string {
    if (!this.selectedDate || !this.selectedPeriod) {
      return 'Selecione uma data e período';
    }
    return `Data: ${this.selectedDate} — ${this.selectedPeriod}`;
  }

  onDurationChange() {
    const selected = this.durationOptions.find(opt => opt.value === this.bookingForm.fDuration);
    this.bookingForm.fServiceValue = selected ? this.formatCurrency(selected.price) : '';
    this.updateTotalPrice();
  }

  onGuestsChange() {
    const selected = this.guestsOptions.find(opt => opt.value === this.bookingForm.fGuests);
    if (selected) {
      this.bookingForm.fServiceValue = selected.price > 0 ? this.formatCurrency(selected.price) : '';
      if (selected.soundPrice > 0) {
        this.bookingForm.fSound = selected.value;
        this.bookingForm.fSoundValue = this.formatCurrency(selected.soundPrice);
      } else {
        this.bookingForm.fSound = '';
        this.bookingForm.fSoundValue = '';
      }
    } else {
      this.bookingForm.fServiceValue = '';
      this.bookingForm.fSoundValue = '';
    }
    this.updateTotalPrice();
  }

  onSoundChange() {
    const selected = this.soundOptions.find(opt => opt.value === this.bookingForm.fSound);
    this.bookingForm.fSoundValue = selected ? this.formatCurrency(selected.price) : '';
    this.updateTotalPrice();
  }

  updateTotalPrice() {
    const service = this.parseCurrency(this.bookingForm.fServiceValue);
    const sound = this.parseCurrency(this.bookingForm.fSoundValue);
    const total = (service || 0) + (sound || 0);
    return this.formatCurrency(total);
  }

  get totalPrice(): string {
    return this.updateTotalPrice();
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  parseCurrency(value: string): number {
    if (!value) {
      return 0;
    }
    return Number(value.replace(/[R$\.\s]/g, '').replace(',', '.')) || 0;
  }

  copyPix() {
    const pix = '71.98765-0321';
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pix).then(() => {
        this.showToast('Chave PIX copiada!', 'success');
      }).catch(() => {
        this.showToast('Erro ao copiar PIX', 'error');
      });
    } else {
      this.showToast('Navegador não suporta copiar automaticamente.', 'error');
    }
  }

  clearForm() {
    this.selectedPeriod = null;
    this.selectedTime = null;
    this.bookingForm = {
      fName: '',
      fPhone: '',
      fEmail: '',
      fAddress: '',
      fDuration: '',
      fGuests: '',
      fServiceValue: '',
      fSound: '',
      fSoundValue: ''
    };
  }

  submitBooking() {
    if (!this.selectedDate || !this.selectedPeriod) {
      this.showToast('Selecione a data e o período primeiro.', 'error');
      return;
    }

    if (!this.bookingForm.fName || !this.bookingForm.fPhone || !this.bookingForm.fEmail || !this.bookingForm.fAddress || !this.bookingForm.fDuration || !this.bookingForm.fGuests) {
      this.showToast('Preencha todos os campos obrigatórios.', 'error');
      return;
    }

    if (this.allEvents.length >= 999) {
      this.showToast('Limite de agendamentos atingido!', 'error');
      return;
    }

    const newEvent: BookingEvent = {
      id: String(Date.now()),
      date: this.selectedDate,
      period: this.selectedPeriod,
      full_name: this.bookingForm.fName,
      phone: this.bookingForm.fPhone,
      email: this.bookingForm.fEmail,
      address: this.bookingForm.fAddress,
      duration: this.bookingForm.fDuration,
      guests: this.bookingForm.fGuests,
      service_value: this.bookingForm.fServiceValue,
      sound_rental: this.bookingForm.fSound,
      sound_value: this.bookingForm.fSoundValue
    };

    this.allEvents.push(newEvent);
    this.saveEvents();

    const periodo = this.periods.find(p => p.key === this.selectedPeriod);

    this.router.navigate(['/agendamento-sucesso', this.musico?.id], {
      queryParams: {
        data: this.selectedDate,
        periodo: this.selectedPeriod,
        horario: periodo?.time,
        valor: this.totalPrice
      }
    });
  }

  onLogoError(event: Event) {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.style.display = 'none';
    }
  }

  showToast(message: string, type: 'success' | 'error') {
    this.toastMessage = message;
    this.toastType = type;
    this.toastVisible = true;
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toastVisible = false;
    }, 3000);
  }

  logout() {
    this.authService.limparSessao();
    this.router.navigate(['/']);
  }
}

