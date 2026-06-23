-- Tabela de músicos
CREATE TABLE IF NOT EXISTS musicos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  musNomeArtistico VARCHAR(255) NOT NULL,
  musEmail VARCHAR(255) NOT NULL UNIQUE,
  musSenha VARCHAR(255) NOT NULL,
  musTelefone VARCHAR(20),
  musEstado VARCHAR(100),
  musCidade VARCHAR(100),
  musGeneros TEXT,
  musContato VARCHAR(100),
  musDescricao TEXT,
  musRedesSociais TEXT,
  dataCriacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  dataAtualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX idx_musicos_email ON musicos(musEmail);
CREATE INDEX idx_musicos_estado_cidade ON musicos(musEstado, musCidade);
