Get-ChildItem -Path "./source/js/" -Recurse -Filter *.js | ForEach-Object { Get-Content $_.FullName } | Set-Content "./intermediary/merged.js"

Add-Content -Path "./intermediary/merged.js" -Value (Get-Content "./internal/spark.js")

Get-Content ./internal/suffix.html, ./intermediary/merged.js, ./internal/postfix.html | Out-File ./debug/index.html

# Define the path to the counter file
$counterFile = "./counter"

# Check if the counter file exists
if (-Not (Test-Path $counterFile)) {
    # If it doesn't exist, create it and set the count to 0
    Set-Content -Path $counterFile -Value 0
}

# Read the current count from the file
$count = Get-Content -Path $counterFile | Out-String
$count = [int]$count

# Increment the count
$count++

# Save the new count back to the file
Set-Content -Path $counterFile -Value $count

$hexCount = '{0:X}' -f $count

# Output the count to the console (optional)
Write-Host "Build #$hexCount"