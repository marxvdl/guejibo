# Como instalar e executar o cliente

1. Instalar o [Node.js](https://nodejs.org/) , caso já não esteja instalado

2. Dentro da pasta `Server`, instalar todas as dependências do projeto:

    ```
    npm install
    ```
3. Executar o comando `ng serve` para para compilar o projeto e iniciar o servidor web de desenvolvimento do Angular:

    ```
    npx ng serve
    ```

4. Se tudo der certo, o cliente pode ser acessado pelo navegador em `http://localhost:4200/`. Para que todas o site funcione, é necessário que o servidor esteja rodando (ver instruções na pasta `Server/`).