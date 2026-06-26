import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Invoice {
  id: number;
  date: string;
  dueDate: string;
  description: string;
  number: string;
  method: string;
  total: number;
  balance: number;
  status: 'paid' | 'pending' | 'overdue';
}

interface Payment {
  id: number;
  date: string;
  orderNumber: string;
  invoiceNumber: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
}

@Component({
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './billing.html',
  styleUrl: './billing.css'
})
export class Billing implements OnInit {
  // Billing data
  invoices: Invoice[] = [];
  filteredInvoices: Invoice[] = [];
  invoiceSearchTerm: string = '';
  paymentMethod: string = 'Pix Automático';
  paymentMethodActive: boolean = true;

  // Payments data
  payments: Payment[] = [];
  filteredPayments: Payment[] = [];
  paymentSearchTerm: string = '';

  ngOnInit(): void {
    this.loadMockData();
  }

  loadMockData(): void {
    this.invoices = [
      {
        id: 1,
        date: '2026-06-25',
        dueDate: '2026-06-25',
        description: 'Pedido',
        number: 'INV-DF-BRA-18359436-65116-50',
        method: 'Pix',
        total: 499.00,
        balance: 0.00,
        status: 'paid'
      },
      {
        id: 2,
        date: '2026-06-20',
        dueDate: '2026-07-20',
        description: 'Assinatura Premium',
        number: 'INV-DF-BRA-28359436-65117-51',
        method: 'Cartão de Crédito',
        total: 9.90,
        balance: 9.90,
        status: 'pending'
      }
    ];
    this.filteredInvoices = [...this.invoices];

    this.payments = [
      {
        id: 1,
        date: '2026-06-25',
        orderNumber: 'ORD-DF-6Z9NV092DZSBWW49LW',
        invoiceNumber: 'BRL_HARDWARESP_INV-209728',
        amount: 499.00,
        status: 'completed'
      }
    ];
    this.filteredPayments = [...this.payments];
  }

  filterInvoices(): void {
    const term = this.invoiceSearchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredInvoices = [...this.invoices];
      return;
    }
    this.filteredInvoices = this.invoices.filter(inv =>
      inv.number.toLowerCase().includes(term) ||
      inv.description.toLowerCase().includes(term)
    );
  }

  get totalBalance(): number {
    return this.invoices.reduce((sum, inv) => sum + inv.balance, 0);
  }

  getInvoiceStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      paid: 'Pago',
      pending: 'Pendente',
      overdue: 'Vencido'
    };
    return labels[status] || status;
  }

  getInvoiceStatusClass(status: string): string {
    return `status-${status}`;
  }

  filterPayments(): void {
    const term = this.paymentSearchTerm.toLowerCase().trim();
    if (!term) {
      this.filteredPayments = [...this.payments];
      return;
    }
    this.filteredPayments = this.payments.filter(pay =>
      pay.orderNumber.toLowerCase().includes(term) ||
      pay.invoiceNumber.toLowerCase().includes(term)
    );
  }

  getPaymentStatusLabel(status: string): string {
    const labels: { [key: string]: string } = {
      completed: 'Concluído',
      pending: 'Pendente',
      failed: 'Falhou'
    };
    return labels[status] || status;
  }

  getPaymentStatusClass(status: string): string {
    return `status-${status}`;
  }

  cancelSubscription(): void {
    const confirmed = confirm('Tem certeza que deseja cancelar sua assinatura? Você perderá acesso aos recursos premium.');
    if (confirmed) {
      alert('Assinatura cancelada com sucesso. Você ainda terá acesso até o final do período vigente.');
    }
  }
}
