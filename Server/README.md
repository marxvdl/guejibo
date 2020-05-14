# Como instalar e configurar o servidor

1. Instalar o [Node.js](https://nodejs.org/) , caso já não esteja instalado

2. Instalar o [MariaDB](https://mariadb.org/), caso já não esteja instalado

3. Dentro da pasta `Server`, instalar todas as dependências do projeto:

    ```
    npm install
    ```

4. Configurar o objeto associado a `development` no arquivo `sequelize/config/config.json` com as informações de conexão do banco de dados (deve ser inserido um usuário e senha que tenham permissões de leitura e escrita em um banco de dados vazio já existente).

5. Utilizar a migração automática do Sequelize para criar as tabelas do banco de dados:

    ```
    cd sequelize
    npx sequelize-cli db:migrate
    ```

    Se tudo der certo, o banco de dados informado no passo anterior agora deve conter as tabelas `Game`, `GameRoom`, `SequelizeMeta`, `User` e `UsersGameRooms`.

6. A tabela `Game` contém informação sobre os jogos existentes no sistema. O campo `basePath` deve conter o nome da pasta (dentro de `Games/`) onde os arquivos do jogo se encontram no sistema de arquivos. 

    No banco de dados, inserir nessa tabela os dados dos jogos configurados. Por exemplo:

    ```sql
    INSERT INTO Game (name, basePath, createdAt, updatedAt) 
    VALUES  ('Jogo da Nave', 'Nave', NOW(), NOW());
    ```

7. Para iniciar o servidor, basta executar (na pasta `Server/`), o comando:

    ```
    node index.js
    ```

8. Se tudo estiver certo, enquanto o servidor estiver em execução, o endereço `http://localhost:3000/api/games` deve retornar um objeto JSON com os itens inseridos na tabela `Game`
