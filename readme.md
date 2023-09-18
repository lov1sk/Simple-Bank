# Simple Bank

#### Descrição:

`Este projeto é um web-service para o backend de uma aplicação bancaria, onde nela é possivel abrir uma conta, fazer transferencias e depositos.`

`Todo o serviço foi construido utilizando principios SOLID, para injeção de dependencias, classes com uma unica responsabilidade, inversão de dependencias`

## Documentação da API

#### Iniciando o projeto:

```
npm init -y

npm i

npm run dev
```

#### Entidades:

Abaixo evidenciamos as entidades que a nossa aplicação utiliza para realizar todo o CRUD
| Entidades | Descrição |
| :--------- | :---------------------------------- |
| Usuario | Pode ser um cliente ou Logista, essa entidade representa uma conta no sistema|
| Credencial | CPF ou CNPJ, entidade criada para distinguir os 2 tipos de credenciais|
| Transferencias | Entidade que representa todas as transferencias que o sistema faz|

#### Casos de uso:

`Abaixo é evidenciado todos os casos de uso que o sistema precisa para funcionar (Seus requesitos Funcionais)`

| Funcionalidades Implementadas | Descrição                                                                                                                                                                        |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Criar um logista              | Basicamente cria na aplicação uma conta para um logista com base em seu CNPJ                                                                                                     |
| Criar um cliente              | Basicamente cria na aplicação uma conta para um client com base em seu CPF                                                                                                       |
| Criar uma credencial          | Cria um registro de CPF ou CNPJ para atrelar a um cliente ou Logista                                                                                                             |
| Login                         | Recebe um email e senha e faz login na aplicação, seu retorno consiste nas informações do usuario e um token JWT                                                                 |
| Criar um logista              | Basicamente cria na aplicação uma conta para um logista com base em seu CNPJ                                                                                                     |
| Checar autorização            | `Depeciada` Checa o Mock para verificar se a transação pode ser feita                                                                                                            |
| Fazer deposito                | Recebe um valor e um id de usuario e faz um deposito em conta do favorecido, acrescentando o valor                                                                               |
| Fazer Transferencia           | Recebe um valor, e 2 id´s, um da conta de quem envia e outro de quem recebe, realiza a checagem da autorização e faz o devido debito e credito de dinheiro nas contas envolvidas |
| Desfazer Transferencia        | Recebe apenas o id da transferencia e faz o processo de desfazer os valores depositados e transferidos das contas envolvidas, após tudo, exclui a transferencia dos registros    |

#### Endpoints:

Criar um Logista na aplicação

```
POST /register/dealer
```

| Parametros         | Descrição |
| :----------------- | :-------- |
| name               | `String`  |
| email              | `String`  |
| password           | `String`  |
| balance `optional` | `Number`  |
| cnpj               | `Number`  |

Criar um cliente na aplicação

```
POST /register/client
```

| Parametros         | Descrição |
| :----------------- | :-------- |
| name               | `String`  |
| email              | `String`  |
| password           | `String`  |
| balance `optional` | `Number`  |
| cpf                | `Number`  |

Realizar uma transferencia

```
POST /new/transfer
```

| Parametros  | Descrição |
| :---------- | :-------- |
| value       | `number`  |
| sender_id   | `String`  |
| receiver_id | `String`  |

Desfazer uma transferencia

```
POST /undo/transfer
```

| Parametros | Descrição |
| :--------- | :-------- |
| id         | `String`  |

Realizar um deposito

```
POST /new/deposit
```

| Parametros | Descrição |
| :--------- | :-------- |
| value      | `number`  |
| id         | `String`  |

Logar na aplicação

```
POST /login
```

| Parametros | Descrição |
| :--------- | :-------- |
| email      | `String`  |
| password   | `String`  |

## Stack utilizada

**Back-end:** NodeJs, Typescript, Fastify, Prisma, SQLite
