import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-referrals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './referrals.html',
  styleUrl: './referrals.css'
})
export class Referrals {
  referralLink: string = 'https://agendacultural.com/indicacao/usuario123';
  referredUsers: number = 0;
  receivedCredits: number = 0;

  copyLink(): void {
    navigator.clipboard.writeText(this.referralLink).then(() => {
      alert('Link de indicação copiado!');
    }).catch(() => {
      alert('Não foi possível copiar o link.');
    });
  }

  async shareLink(): Promise<void> {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Indicação Agenda Cultural',
          text: 'Indico você a conhecer a Agenda Cultural! Use meu link de indicação:',
          url: this.referralLink
        });
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          alert('Não foi possível compartilhar o link.');
        }
      }
    } else {
      alert('Compartilhamento não suportado neste navegador. Use o botão "Copiar link".');
    }
  }

  inviteByEmail(): void {
    const subject = encodeURIComponent('Indicação Agenda Cultural');
    const body = encodeURIComponent(`Olá!\n\nIndico você a conhecer a Agenda Cultural. Use meu link: ${this.referralLink}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  }
}
