Get-ChildItem -Path "./source/js/" -Recurse -Filter *.js | ForEach-Object { Get-Content $_.FullName } | Set-Content "./intermediary/merged.js"

Add-Content -Path "./intermediary/merged.js" -Value (Get-Content "./internal/spark.js")

terser "./intermediary/merged.js" -o "./intermediary/tersed.js"

roadroller "./intermediary/tersed.js" -o "./intermediary/roadrolled.js"

Get-Content ./internal/suffix.html, ./intermediary/roadrolled.js, ./internal/postfix.html | Out-File ./build/build.html

& "D:\7-Zip\7z.exe" a -tzip "./build/build.zip" "./build/build.html"