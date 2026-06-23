# Teste de cadastro de músico
$apiUrl = "http://localhost:3000/api/musicos"

$timestamp = Get-Date -Format "yyyyMMddHHmmss"

$body = @{
    nome = "EDISON BARBOSA DA ROCHA"
    email = "teste_$timestamp@gmail.com"
    telefone = "11913227557"
    tipoServico = "Banda de Rock"
    localizacao = "Salvador"
    descricao = "teste"
    site = "ewre"
    redesSociais = @{
        facebook = "werwer"
        instagram = "werwer"
        tiktok = "werwerw"
    }
    drive = "werwer"
    videos = @("werwe", "rwerwer", "werwer", "wer")
} | ConvertTo-Json -Depth 5

Write-Host "🧪 Testando cadastro de músico..." -ForegroundColor Cyan
Write-Host ""
Write-Host "Dados enviados:" -ForegroundColor Yellow
Write-Host $body
Write-Host ""
Write-Host "---" -ForegroundColor Gray
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri $apiUrl -Method POST -Body $body -ContentType 'application/json'
    
    Write-Host "✅ Sucesso!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Resposta:" -ForegroundColor Yellow
    Write-Host ($response | ConvertTo-Json -Depth 5)
} catch {
    Write-Host "❌ Erro ao cadastrar:" -ForegroundColor Red
    Write-Host $_.Exception.Message
    
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Detalhes:" -ForegroundColor Yellow
        Write-Host $responseBody
    }
}
