![Guejibo](https://raw.githubusercontent.com/marxvdl/guejibo/master/Client/src/assets/guejibo.png)

**Guejibo** é uma plataforma que reúne jogos educacionais competitivos especialmente voltados para o uso em salas de aula físicas e virtuais.

O sistema está disponível para uso online gratuito em http://www.guejibo.com.

Este repositório reúne todo o código-fonte da plataforma, inclusive cliente, servidor e jogos.

## Diretórios principais

- **Client**: Interface principal do sistema, desenvolvida em [Angular](https://angular.io/)
- **Client-JQuery**: Interface provisória de desenvolvimento do sistema (não usada em produção).
- **Games**: Jogos do sistema, cada um em uma subpasta (O jogo *stub* é usado apenas para testes).
- **GamesLib**: Biblioteca usada pelos jogos para a comunicação com o restante do sistema
- **Server**: Back-end do sistema, utilizando [Node.js](https://nodejs.org/) e [Express](https://expressjs.com/). O arquivo README.md dentro deste diretório contém instruções de implantação

## Gerando a versão de produção

O sistema de produção é gerado com o auxílio do utilitário [Gulp](https://gulpjs.com/), de acordo com o arquivo *gulpfile.js*.

O comando `gulp build`, executado na raiz deste projeto, deve gerar um diretório chamado `dist` contendo o código de produção de todos os módulos, pronto para ser implantado em um servidor. Os comandos `gulp client`, `gulp server`, `gulp games` e `gulp gameslib` geram, cada um, apenas os arquivos do módulo correspondente.
