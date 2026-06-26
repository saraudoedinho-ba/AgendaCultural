import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings implements OnInit {
  settingsForm!: FormGroup;
  salvando = false;

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      nomeArtistico: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: [''],
      estado: [''],
      cidade: [''],
      bairro: [''],
      enderecoCompleto: [''],
      tipoServico: [[]],
      breveDescricao: [''],
      descricaoCompleta: [''],
      contato: [''],
      spotify: [''],
      siteArtista: [''],
      facebook: [''],
      tiktok: [''],
      outrasRedes: [''],
      googleDrive: ['']
    });

    // Mock loaded user data
    this.settingsForm.patchValue({
      nomeArtistico: 'Banda Teste',
      email: 'banda@email.com',
      telefone: '(11) 99999-9999',
      estado: 'SP',
      cidade: 'São Paulo',
      bairro: 'Centro',
      enderecoCompleto: 'Rua Exemplo, 123',
      breveDescricao: 'Banda cover para eventos',
      descricaoCompleta: 'Tocamos os maiores sucessos para animar sua festa.',
      contato: '(11) 99999-9999',
      spotify: '',
      siteArtista: '',
      facebook: '',
      tiktok: '',
      outrasRedes: '@bandateste',
      googleDrive: ''
    });

    this.aoSelecionarEstado();
  }

  aoSelecionarEstado(): void {
    const sigla = this.settingsForm.get('estado')?.value;
    this.cidadesDisponiveis = sigla ? (this.cidadesPorEstado[sigla] || []) : [];
  }

  onSubmit(): void {
    if (this.settingsForm.invalid) {
      alert('Preencha os campos obrigatórios.');
      return;
    }
    this.salvando = true;
    setTimeout(() => {
      this.salvando = false;
      alert('Configurações salvas com sucesso!');
    }, 1000);
  }

  onCancel(): void {
    this.ngOnInit();
  }
}
