@ECHO OFF
:: This file can now be deleted!
:: It was used when setting up the package solution (using https://github.com/LottePitcher/opinionated-package-starter)

:: set up git
git init
git branch -M main
git remote add origin https://github.com/jonathoncove1/umbraco-dadjokes.git

:: ensure latest Umbraco templates used
dotnet new install Umbraco.Templates --force

:: use the umbraco-extension dotnet template to add the package project
cd src
dotnet new umbraco-extension -n "DadJokes" --site-domain 'https://localhost:44376' --include-example --allow-scripts Yes

:: replace package .csproj with the one from the template so has nuget info
cd DadJokes
del DadJokes.csproj
ren DadJokes_nuget.csproj DadJokes.csproj

:: add project to solution
cd..
dotnet sln add "DadJokes"

:: add reference to project from test site
dotnet add "DadJokes.TestSite/DadJokes.TestSite.csproj" reference "DadJokes/DadJokes.csproj"