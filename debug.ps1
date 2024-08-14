Get-ChildItem -Path "./source/js/" -Recurse -Filter *.js | ForEach-Object { Get-Content $_.FullName } | Set-Content "./intermediary/merged.js"

Add-Content -Path "./intermediary/merged.js" -Value (Get-Content "./internal/spark.js")

Get-Content ./internal/suffix.html, ./intermediary/merged.js, ./internal/postfix.html | Out-File ./debug/index.html
