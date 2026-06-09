import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MusicosService } from '../../services/musicos.service';
import { HeaderComponent } from '../../components/header/header'
  
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './cadastro.html',
  styleUrls: ['./cadastro.css']
})
export class CadastroComponent implements OnInit {
    cadastroForm!: FormGroup;
  salvando = false;
  mensagemErro = '';
  especialidadesList = ['Banda Completa', 'Solo', 'Duo', 'Trio', 'Quarteto', 'DJ', 'Voz e Violao', 'Instrumental', 'Todos', 'Todos exceto DJ'];
  generosList = ['Samba', 'Pagode', 'Bossa Nova', 'MPB', 'Forro', 'Gospel', 'Sertanejo'];

    estados = [
      { sigla: 'AC', nome: 'Acre' },
      { sigla: 'AL', nome: 'Alagoas' },
      { sigla: 'AP', nome: 'Amapá' },
      { sigla: 'AM', nome: 'Amazonas' },
      { sigla: 'BA', nome: 'Bahia' },
      { sigla: 'CE', nome: 'Ceará' },
      { sigla: 'DF', nome: 'Distrito Federal' },
      { sigla: 'ES', nome: 'Espírito Santo' },
      { sigla: 'GO', nome: 'Goiás' },
      { sigla: 'MA', nome: 'Maranhão' },
      { sigla: 'MT', nome: 'Mato Grosso' },
      { sigla: 'MS', nome: 'Mato Grosso do Sul' },
      { sigla: 'MG', nome: 'Minas Gerais' },
      { sigla: 'PA', nome: 'Pará' },
      { sigla: 'PB', nome: 'Paraíba' },
      { sigla: 'PR', nome: 'Paraná' },
      { sigla: 'PE', nome: 'Pernambuco' },
      { sigla: 'PI', nome: 'Piauí' },
      { sigla: 'RJ', nome: 'Rio de Janeiro' },
      { sigla: 'RN', nome: 'Rio Grande do Norte' },
      { sigla: 'RS', nome: 'Rio Grande do Sul' },
      { sigla: 'RO', nome: 'Rondônia' },
      { sigla: 'RR', nome: 'Roraima' },
      { sigla: 'SC', nome: 'Santa Catarina' },
      { sigla: 'SP', nome: 'São Paulo' },
      { sigla: 'SE', nome: 'Sergipe' },
      { sigla: 'TO', nome: 'Tocantins' }
    ];

    cidadesPorEstado: { [sigla: string]: string[] } = {
      AC: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó'],
      AL: ['Maceió', 'Arapiraca', 'Rio Largo', 'Palmeira dos Índios', 'Penedo'],
      AP: ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Porto Grande'],
      AM: ['Manaus', 'Parintins', 'Itacoatiara', 'Manacapuru', 'Coari'],
      BA: ['Salvador', 'Feira de Santana', 'Vitória da Conquista', 'Camaçari', 'Ilhéus', 'Lauro de Freitas', 'Porto Seguro', 'Barreiras'],
      CE: ['Fortaleza', 'Caucaia', 'Juazeiro do Norte', 'Maracanaú', 'Sobral', 'Crato'],
      DF: ['Brasília', 'Taguatinga', 'Ceilândia', 'Gama', 'São Sebastião'],
      ES: ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Linhares', 'Cachoeiro de Itapemirim'],
      GO: ['Goiânia', 'Anápolis', 'Aparecida de Goiânia', 'Rio Verde', 'Luziânia'],
      MA: ['São Luís', 'Imperatriz', 'Caxias', 'Timon', 'Codó'],
      MT: ['Cuiabá', 'Várzea Grande', 'Rondonópolis', 'Sinop', 'Tangará da Serra'],
      MS: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã'],
      MG: ['Belo Horizonte', 'Uberlândia', 'Contagem', 'Juiz de Fora', 'Montes Claros', 'Uberaba', 'Divinópolis', 'Ipatinga'],
      PA: ['Belém', 'Ananindeua', 'Santarém', 'Marabá', 'Castanhal'],
      PB: ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux'],
      PR: ['Curitiba', 'Londrina', 'Maringá', 'Ponta Grossa', 'Cascavel', 'São José dos Pinhais'],
      PE: ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Petrolina', 'Paulista'],
      PI: ['Teresina', 'Parnaíba', 'Picos', 'Floriano', 'Piripiri'],
      RJ: ['Rio de Janeiro', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'Niterói', 'Campos dos Goytacazes', 'Petrópolis', 'Volta Redonda'],
      RN: ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Ceará-Mirim'],
      RS: ['Porto Alegre', 'Caxias do Sul', 'Pelotas', 'Canos', 'Santa Maria', 'Novo Hamburgo'],
      RO: ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal'],
      RR: ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Mucajaí', 'Alto Alegre'],
      SC: ['Florianópolis', 'Joinville', 'Blumenau', 'São José', 'Chapecó', 'Itajaí'],
      SP: ['São Paulo', 'Guarulhos', 'Campinas', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'São José dos Campos', 'Ribeirão Preto', 'Sorocaba', 'Santos', 'Mauá', 'Carapicuíba', 'Jundiaí', 'Piracicaba', 'Bauru'],
      SE: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'Estância'],
      TO: ['Palmas', 'Araguaína', 'Gurupi', 'Tocantinópolis', 'Paraíso do Tocantins']
    };

    cidadesDisponiveis: string[] = [];

    aoSelecionarEstado() {
      const sigla = this.cadastroForm.get('estado')?.value;
      this.cidadesDisponiveis = sigla ? (this.cidadesPorEstado[sigla] || []) : [];
      this.cadastroForm.get('cidade')?.setValue('');
    }

    constructor(private fb: FormBuilder, private router: Router, private musicosService: MusicosService) {}

  ngOnInit() {
    this.cadastroForm = this.fb.group({
      nomeArtistico: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      telefone: [''],
      estado: [''],
      cidade: [''],
      bairro: [''],
            bandaCompleta: [false],
      trio: [false],
      vozViolao: [false],
      todosExcetoDJ: [false],
      solo: [false],
      quarteto: [false],
      instrumental: [false],
      duo: [false],
      dj: [false],
      todos: [false],
      tipoServico: [[]],
      outrosGeneros: [''],
      breveDescricao: [''],
      descricaoCompleta: [''],
            enderecoCompleto: [''],
      contato: [''],
      spotify: [''],
      siteArtista: [''],
      facebook: [''],
      tiktok: [''],
      outrasRedes: [''],
      googleDrive: [''],
      locacao10a50: this.fb.group({ checked: [false], valor: [''] }),
      locacao50a100: this.fb.group({ checked: [false], valor: [''] }),
      locacao100Mais: this.fb.group({ checked: [false], valor: [''] }),
      negociarPorHora: this.fb.group({ checked: [false], valor: [''] }),
      video01: [''],
      video02: [''],
      video03: [''],
      video04: ['']


        });
  }

  

  onSubmit() {
    if (this.salvando) return;
    if (this.cadastroForm.invalid) {
      this.mensagemErro = 'Preencha os campos obrigatórios';
      return;
    }
    this.salvando = true;
    this.mensagemErro = '';
    const form = this.cadastroForm.value;
    const dados = {
      musNomeArtistico: form.nomeArtistico.trim(),
      musEmail: form.email.trim(),
      musSenha: form.senha || null,
      musTelefone: form.telefone?.trim() || null,
      musEstado: form.estado?.trim() || null,
      musCidade: form.cidade?.trim() || null,
      musBairro: form.bairro?.trim() || null,
      musDescricaoBreve: form.breveDescricao?.trim() || null,
      musDescricao: form.descricaoCompleta?.trim() || null,
      musContato: form.contato?.trim() || null,
      musTipoServico: form.tipoServico?.join(', ') || null,
      musEspecialidade: [
        form.bandaCompleta ? 'Banda Completa' : null,
        form.solo ? 'Solo' : null,
        form.duo ? 'Duo' : null,
        form.trio ? 'Trio' : null,
        form.quarteto ? 'Quarteto' : null,
        form.dj ? 'DJ' : null,
        form.vozViolao ? 'Voz e Violão' : null,
        form.instrumental ? 'Instrumental' : null,
        form.todos ? 'Todos' : null,
        form.todosExcetoDJ ? 'Todos exceto DJ' : null
      ].filter(Boolean).join(', ') || null
    };
        console.log('Dados enviados para API:', JSON.stringify(dados, null, 2));
    this.musicosService.cadastrarMusico(dados).subscribe({
      next: (response) => {
        console.log('Resposta da API (cadastro realizado):', JSON.stringify(response, null, 2));
        this.musicosService.enviarEmailCadastro({
          nomeArtistico: dados.musNomeArtistico,
          email: dados.musEmail,
          telefone: dados.musTelefone,
          cidade: dados.musCidade,
          estado: dados.musEstado
        }).subscribe({
          next: () => {
            alert(`Cadastro realizado! ID: ${response.id}`);
            this.salvando = false;
            this.router.navigate(['/']);
          },
          error: () => {
            alert(`Cadastro realizado! ID: ${response.id}`);
            this.salvando = false;
            this.router.navigate(['/']);
          }
        });
      },
      error: (error) => {
        console.error('Erro ao cadastrar:', error);
        this.salvando = false;
        if (error.status === 0) {
          this.mensagemErro = 'Servidor offline. Verifique sua conexão.';
        } else {
          this.mensagemErro = 'Erro ao cadastrar. Tente novamente.';
        }
        alert(this.mensagemErro);
      }
    });
  }

  onCancel() { this.cadastroForm.reset(); }
  onFileChange(event: any) {}  
}
