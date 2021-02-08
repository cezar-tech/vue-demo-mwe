# Instalação

## Essencial:

* Instalar o NPM: https://www.npmjs.com/get-npm;
* Instalar o Yarn: https://yarnpkg.com/getting-started;

## Complementar

* Instalar o vue-cli: https://cli.vuejs.org/
* plugin de vue para navegador (instalar versão beta para vue3):
  * Estável: https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd?hl=pt-BR;
  * Beta: https://chrome.google.com/webstore/detail/vuejs-devtools/ljjemllljcmogpfapbkkighbhhppjdbg

# Instalar dependências de cada pasta

Para deixar o projeto pronto para rodar é preciso instalar as dependências de cada pasta. Entre na pasta backend e
execute o comando `npm install`, em seguida entre na pasta frontend e faça o mesmo.

Deverão ser criados um arquivo e um diretório na pasta em que estiver:

* node_modules: todas as dependências que seu projeto precisa para rodar;
* package-lock.json: Usado para gerenciar quais dependências precisam ou não serem atualizadas considerando o arquivo
  package.json.

Dado isso:

* NUNCA altere o conteúdo de nenhum desses dois;
* Não é uma boa prática comitar esses arquivos já que podem ser gerados com o `npm install`, pesam o projeto e são
  totalmente descartáveis;

# Iniciar o backend

Na pasta backend temos um código baśico que simula um servidor para a aplicação frontend consumir. Para iniciar esse
servidor é preciso:

* Entrar na pasta backend;
* Executar o comando `yarn start`;
* Seu terminal ficará travado com o servidor rodando após a seguinte saída:

```
cezar@cezar-augusto:~/PycharmProjects/vue-js-superheroes/backend$ yarn start
yarn run v1.22.10
warning package.json: No license field
$ json-server --watch allPosts.json --port 3001

  \{^_^}/ hi!

  Loading allPosts.json
  Done

  Resources
  http://localhost:3001/posts
  http://localhost:3001/comments
  http://localhost:3001/likes
  http://localhost:3001/bestFriends

  Home
  http://localhost:3001

  Type s + enter at any time to create a snapshot of the database
  Watching...
```

Com isso a aplicação ficará disponível para responder à requisições GET nas urls citadas em "resources". A resposta
dessas urls é sempre a mesma e pode ser visto o que é respondido no arquivo `allPosts.json` onde temos uma chave no
document json para cada url: "posts", "comments", "likes" e "bestFriends".

É possível de se alterar as rotas e as respostas se quiserem alterado tal arquivo json com o que desejar.

# Iniciar o frontend

Acesse o README.md gerado automaticamente pelo boilerplate do vue-cli para criação de projetos vue:
[frontend-readme](frontend/README.md) 

