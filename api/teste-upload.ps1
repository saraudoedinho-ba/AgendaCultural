# PowerShell - Script para testar a rota de upload no servidor

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Teste da Rota /api/posImg" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Testando a rota..." -ForegroundColor Yellow
Write-Host "POST https://dagratidao.com.br/api/posImg" -ForegroundColor White
Write-Host ""

# Fazer requisição de teste
try {
    $response = Invoke-WebRequest -Uri "https://dagratidao.com.br/api/posImg" `
        -Method POST `
        -Headers @{"Accept"="application/json"} `
        -ErrorAction Stop
    
    Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Resposta:" -ForegroundColor White
    $response.Content
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Write-Host "❌ Status: $statusCode" -ForegroundColor Red
    
    if ($statusCode -eq 404) {
        Write-Host ""
        Write-Host "ERRO 404 - Rota não encontrada!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Possíveis causas:" -ForegroundColor Yellow
        Write-Host "1. O servidor NÃO foi reiniciado após atualização" -ForegroundColor White
        Write-Host "   Solução: pm2 restart dagratidao" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "2. Arquivo posImg.routes.js NÃO foi enviado" -ForegroundColor White
        Write-Host "   Verifique no servidor: ls api/routes/posImg.routes.js" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "3. Erro no dagratidao.js ao carregar a rota" -ForegroundColor White
        Write-Host "   Verifique logs: pm2 logs dagratidao" -ForegroundColor Cyan
    } elseif ($statusCode -eq 400) {
        Write-Host ""
        Write-Host "✅ A rota EXISTE! (400 = esperado sem arquivo)" -ForegroundColor Green
        Write-Host "Resposta:" -ForegroundColor White
        $_.Exception.Response
    }
}

Write-Host ""
Write-Host "======================================" -ForegroundColor Cyan
Write-Host "Para ver os logs do servidor:" -ForegroundColor Yellow
Write-Host "ssh usuario@dagratidao.com.br" -ForegroundColor Cyan
Write-Host "pm2 logs dagratidao" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan
