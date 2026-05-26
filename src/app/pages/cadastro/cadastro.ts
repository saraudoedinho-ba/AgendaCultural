import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  especialidadesList = [
    'Banda Completa', 'Solo', 'Duo',
    'Trio', 'Quarteto', 'DJ',
    'Voz e Violão', 'Instrumental', 'Todos',
    'Todos exceto DJ'
  ];

  generosList = [
    'Samba', 'Pagode', 'Bossa Nova', 'MPB', 'Forró', 'Gospel', 'Sertanejo'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.cadastroForm = this.fb.group({
      // Dados Pessoais
      nomeArtistico: ['', Validators.required],
      fotoArtista: [null, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      telefone: ['', Validators.required],

      // Localização
      estado: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
      enderecoCompleto: [''],

      // Informações Artísticas
      especialidades: this.fb.array([]),
      tipoServico: [[], Validators.required],
      outrosGeneros: [''],
      breveDescricao: [''],
      descricaoCompleta: [''],

      // Valores de Locação de Som
      locacao10a50: this.fb.group({
        checked: [false],
        valor: ['']
      }),
      locacao50a100: this.fb.group({
        checked: [false],
        valor: ['']
      }),
      locacao100Mais: this.fb.group({
        checked: [false],
        valor: ['']
      }),

      // Valor do Cachê
      negociarPorHora: this.fb.group({
        checked: [false],
        valor: ['']
      }),

      // Redes Sociais
      contato: [''],
      spotify: [''],
      siteArtista: [''],
      facebook: [''],
      tiktok: [''],
      outrasRedes: [''],
      googleDrive: [''],

      // Vídeos
      video01: [''],
      video02: [''],
      video03: [''],
      video04: ['']
    });

    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.especialidadesList.forEach(() => this.especialidadesFormArray.push(this.fb.control(false)));
  }

  get especialidadesFormArray() {
    return this.cadastroForm.controls['especialidades'] as FormArray;
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.cadastroForm.patchValue({
        fotoArtista: file
      });
    }
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      console.log('Formulário enviado:', this.cadastroForm.value);
    } else {
      Object.values(this.cadastroForm.controls).forEach(control => {
        control.markAsTouched();
      });
    }
  }

  onCancel() {
    this.cadastroForm.reset();
  }
}