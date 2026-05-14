import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-confirmacao-agendamento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmacao-agendamento.component.html',
  styleUrls: ['./confirmacao-agendamento.component.css']
})
export class ConfirmacaoAgendamentoComponent implements OnInit {
  musicoId: string = '';
  nomeMusico: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.musicoId = this.route.snapshot.queryParams['musicoId'] || '';
    this.nomeMusico = this.route.snapshot.queryParams['nomeMusico'] || '';
  }

  voltarAgenda(): void {
    this.router.navigate(['/agenda-evento'], {
      queryParams: {
        musicoId: this.musicoId,
        nomeMusico: this.nomeMusico
      }
    });
  }

  irHome(): void {
    this.router.navigate(['/']);
  }
}
