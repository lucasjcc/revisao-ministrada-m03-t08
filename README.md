# Revisão módulo 03

## Descrição da proposta
Construir uma RESTful API que simule funcionalidades de um aplicativo de gestão de gastos:

- Cadastrar usuário;
- Fazer login do usuário;
- O usuário deve ser capaz de exibir seus gasto;
- O usuário deve ser capaz de detalhar um gasto;
- O usuário deve ser capaz de editar um gasto;
- O usuário deve ser capaz de excluir um gasto.
  
## Banco de dados

### => Tabela usuarios
Essa tabela deve ter os seguintes campos:
- id (identificador único);
- nome (obrigatório);
- email (obrigatório e único);
- senha (obrigatório).

### => Tabela gastos
Essa tabela deve ter os seguintes campos:
- id (identificador único);
- id_usuario (chave estrangeira);
- valor (maior que zero e obrigatório);
- data (sempre a data do cadastro);
- descricao (optativo).

## Rotas

### Sem validação de sessão
#### `POST` /`usuarios`
#### `POST` /`login`

### Com validação de sessão
#### `GET` /`gastos`
#### `GET` /`gastos/:id`
#### `PUT` /`gastos/:id`
#### `DELETE` /`gastos/:id`


