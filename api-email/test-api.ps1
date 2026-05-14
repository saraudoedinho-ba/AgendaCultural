# Script de teste da API de Email
# Execute: .\test-api.ps1

Write-Host "🧪 Testando API de Email - Agenda Cultural" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

# Verificar se a API está rodando
Write-Host "1️⃣ Verificando se a API está online..." -ForegroundColor Yellow

try {
    $health = Invoke-RestMethod -Uri "http://localhost:3001/health" -Method Get -TimeoutSec 3
    Write-Host "✅ API está online!" -ForegroundColor Green
    Write-Host "   Status: $($health.status)" -ForegroundColor Gray
    Write-Host "   Serviço: $($health.service)" -ForegroundColor Gray
    Write-Host ""
} catch {
    Write-Host "❌ API não está rodando!" -ForegroundColor Red
    Write-Host "   Execute primeiro: cd api-email; node server.js" -ForegroundColor Yellow
    Write-Host ""
    exit 1
}

# Testar envio de email
Write-Host "2️⃣ Enviando email de teste..." -ForegroundColor Yellow

$body = @{
    nomeArtistico = "Teste PowerShell"
    email = "teste@agendamusical.net.br"
    telefone = "11999999999"
    cidade = "São Paulo"
    estado = "SP"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/server-email" -Method Post -Body $body -ContentType "application/json"
    
    if ($response.success) {
        Write-Host "✅ Email enviado com sucesso!" -ForegroundColor Green
        Write-Host "   Mensagem: $($response.message)" -ForegroundColor Gray
        Write-Host "   Verifique ba.edison@gmail.com" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️ Resposta inesperada:" -ForegroundColor Yellow
        Write-Host $response
    }
} catch {
    Write-Host "❌ Erro ao enviar email!" -ForegroundColor Red
    Write-Host "   $_" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $reader = [System.IO.StreamReader]::new($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "   Detalhes: $responseBody" -ForegroundColor Gray
    }
}

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "Teste concluído!" -ForegroundColor Cyan
