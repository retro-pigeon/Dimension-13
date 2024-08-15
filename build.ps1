Get-ChildItem -Path "./source/js/" -Recurse -Filter *.js | ForEach-Object { Get-Content $_.FullName } | Set-Content "./intermediary/merged.js"

Add-Content -Path "./intermediary/merged.js" -Value (Get-Content "./internal/spark.js")

terser "./intermediary/merged.js" -o "./intermediary/tersed.js"

roadroller "./intermediary/tersed.js" -o "./intermediary/roadrolled.js"

Get-Content ./internal/suffix.html, ./intermediary/roadrolled.js, ./internal/postfix.html | Out-File ./build/build.html

advzip -4 -a ./build/build.zip ./build/index.html -i 2000