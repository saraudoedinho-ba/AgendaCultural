import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-agenda-evento',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './agenda-evento.component.html',
  styleUrls: ['./agenda-evento.component.css']
})
export class AgendaEventoComponent implements OnInit {
  nomeMusico: string = '';
  musicoId: string = '';
  faixaValorOptions = [
    { value: '10-50', label: '10 a 50 convidados' },
    { value: '50-100', label: '50 a 100 convidados' },
    { value: '100+', label: '100 ou mais convidados' }
  ];
  aluguelSomOptions = [
    { value: '10-50', label: '10 a 50 convidados' },
    { value: '50-100', label: '50 a 100 convidados' },
    { value: '100+', label: '100 ou mais convidados' },
    { value: 'negociar', label: 'Negociar' }
  ];
  
  diasSemana = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  anos: number[] = [];
  mesSelecionado: number = new Date().getMonth();
  anoSelecionado: number = new Date().getFullYear();
  diasMes: Array<{ numero: number; disponivel: boolean; selecionado: boolean }> = [];
  diasSelecionados: number[] = [];
  diasSemanaSelecionados: Set<number> = new Set();
  mostrarFormulario: boolean = false;
  
  // Dados do formulário
  formulario = {
    nomeCompleto: '',
    celular: '',
    email: '',
    enderecoEvento: '',
    duracaoEvento: '',
    numeroConvidados: '',
    aluguelSom: ''
  };

  agendados = [
    { nome: 'adelmo lopes', data: '2026-04-10', periodo: 'MANHÃ' },
    { nome: 'adelmo correia lopes', data: '2026-04-10', periodo: 'TARDE' },
    { nome: 'adelmo correia lopes', data: '2026-04-10', periodo: 'NOITE' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.musicoId = this.route.snapshot.queryParams['musicoId'] || '';
    this.nomeMusico = this.route.snapshot.queryParams['nomeMusico'] || 'Kim Bala';
    
    // Gerar anos (atual + próximos 2 anos)
    const anoAtual = new Date().getFullYear();
    for (let i = 0; i < 3; i++) {
      this.anos.push(anoAtual + i);
    }
    
    this.gerarDiasMes();
  }

  gerarDiasMes() {
    this.diasMes = [];
    this.diasSelecionados = [];
    this.diasSemanaSelecionados.clear();
    this.mostrarFormulario = false;
    
    const diasDisponiveis = [11, 16, 20];
    const diasNoMes = new Date(this.anoSelecionado, this.mesSelecionado + 1, 0).getDate();
    
    for (let i = 1; i <= diasNoMes; i++) {
      this.diasMes.push({
        numero: i,
        disponivel: diasDisponiveis.includes(i),
        selecionado: false
      });
    }
  }

  toggleDia(dia: any) {
    if (dia.disponivel) {
      dia.selecionado = !dia.selecionado;
      
      // Calcular o dia da semana para este dia
      const data = new Date(this.anoSelecionado, this.mesSelecionado, dia.numero);
      const diaSemana = data.getDay();
      
      if (dia.selecionado) {
        this.diasSelecionados.push(dia.numero);
        this.diasSemanaSelecionados.add(diaSemana);
        this.mostrarFormulario = true;
      } else {
        const index = this.diasSelecionados.indexOf(dia.numero);
        if (index > -1) {
          this.diasSelecionados.splice(index, 1);
        }
        
        // Verificar se ainda há algum dia selecionado neste dia da semana
        const temOutroDiaNesteDiaSemana = this.diasMes.some(d => 
          d.selecionado && d.numero !== dia.numero &&
          new Date(this.anoSelecionado, this.mesSelecionado, d.numero).getDay() === diaSemana
        );
        
        if (!temOutroDiaNesteDiaSemana) {
          this.diasSemanaSelecionados.delete(diaSemana);
        }
      }
      
      // Ocultar formulário se não houver dias selecionados
      if (this.diasSelecionados.length === 0) {
        this.mostrarFormulario = false;
      }
    }
  }

  agendar() {
    if (this.diasSelecionados.length === 0) {
      alert('Por favor, selecione pelo menos uma data disponível.');
      return;
    }
    
    // Validar campos obrigatórios
    if (!this.formulario.nomeCompleto || !this.formulario.celular || !this.formulario.email ||
        !this.formulario.enderecoEvento || !this.formulario.duracaoEvento || 
        !this.formulario.numeroConvidados || !this.formulario.aluguelSom) {
      alert('Por favor, preencha todos os campos do formulário.');
      return;
    }
    
    this.router.navigate(['/confirmacao-agendamento'], {
      queryParams: {
        musicoId: this.musicoId,
        nomeMusico: this.nomeMusico
      }
    });
  }

  limpar() {
    this.formulario = {
      nomeCompleto: '',
      celular: '',
      email: '',
      enderecoEvento: '',
      duracaoEvento: '',
      numeroConvidados: '',
      aluguelSom: ''
    };
    this.gerarDiasMes();
  }

  removerAgendado(item: { nome: string; data: string; periodo: string }) {
    const index = this.agendados.indexOf(item);
    if (index >= 0) {
      this.agendados.splice(index, 1);
    }
  }

  voltar() {
    this.router.navigate(['/perfil-musico', this.musicoId]);
  }

  isDiaSemanaSelecionado(index: number): boolean {
    return this.diasSemanaSelecionados.has(index);
  }
  
  isFormularioValido(): boolean {
    return !!(this.formulario.nomeCompleto && this.formulario.celular && 
             this.formulario.email && this.formulario.enderecoEvento && 
             this.formulario.duracaoEvento && this.formulario.numeroConvidados && 
             this.formulario.aluguelSom);
  }

  private getValorServicoNumero(): number | null {
    switch (this.formulario.numeroConvidados) {
      case '10-50':
        return 500;
      case '50-100':
        return 900;
      case '100+':
        return 1500;
      default:
        return null;
    }
  }

  private getValorAluguelNumero(): number | null {
    switch (this.formulario.aluguelSom) {
      case '10-50':
        return 300;
      case '50-100':
        return 700;
      case '100+':
        return 1200;
      default:
        return null;
    }
  }

  private formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  getValorServicoSelecionado(): string {
    const valor = this.getValorServicoNumero();
    return valor !== null ? this.formatarMoeda(valor) : 'A combinar';
  }

  getValorAluguelSelecionado(): string {
    const valor = this.getValorAluguelNumero();
    return valor !== null ? this.formatarMoeda(valor) : 'A combinar';
  }

  getValorTotal(): string {
    const valorServico = this.getValorServicoNumero();
    const valorAluguel = this.getValorAluguelNumero();

    if (valorServico === null || valorAluguel === null) {
      return '0.00';
    }

    return this.formatarMoeda(valorServico + valorAluguel);
  }
}
