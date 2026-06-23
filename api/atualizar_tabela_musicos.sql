-- Script para atualizar a tabela musicos com os novos campos

-- Adicionar colunas para tipo de serviço
ALTER TABLE musicos ADD COLUMN musTipoServico VARCHAR(100);

-- Adicionar colunas para redes sociais
ALTER TABLE musicos ADD COLUMN musSiteArtista VARCHAR(255);
ALTER TABLE musicos ADD COLUMN musFacebook VARCHAR(255);
ALTER TABLE musicos ADD COLUMN musInstagram VARCHAR(255);
ALTER TABLE musicos ADD COLUMN musTiktok VARCHAR(255);
ALTER TABLE musicos ADD COLUMN musDriveGoogle TEXT;

-- Adicionar colunas para vídeos do YouTube
ALTER TABLE musicos ADD COLUMN musVideo01Youtube VARCHAR(255);
ALTER TABLE musicos ADD COLUMN musVideo02Youtube VARCHAR(255);
ALTER TABLE musicos ADD COLUMN musVideo03Youtube VARCHAR(255);
ALTER TABLE musicos ADD COLUMN musVideo04Youtube VARCHAR(255);

-- Adicionar coluna para localização completa
ALTER TABLE musicos ADD COLUMN musLocalizacao VARCHAR(255);

-- Adicionar coluna para descrição breve
ALTER TABLE musicos ADD COLUMN musDescricaoBreve TEXT;
