Get-ChildItem -Path "./source/js/" -Recurse -Filter *.js | ForEach-Object { Get-Content $_.FullName } | Set-Content "./intermediary/merged.js"

Add-Content -Path "./intermediary/merged.js" -Value (Get-Content "./internal/spark.js")

google-closure-compiler --compilation_level ADVANCED_OPTIMIZATIONS --js ./intermediary/merged.js --js_output_file ./intermediary/tersed.js --jscomp_off=checkTypes --jscomp_off=undefinedVars


roadroller "./intermediary/tersed.js" -o "./intermediary/roadrolled.js"

Get-Content ./internal/suffix.html, ./intermediary/roadrolled.js, ./internal/postfix.html | Out-File ./build/index.html

advzip -4 -a ./build/build.zip ./build/index.html -i 2000