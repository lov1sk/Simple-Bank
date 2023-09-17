> Entidades
> usuario
> transferencia

> Usuario
> id
> nome
> CPF "unique"
> email: "unique"
> senha
> type: 'common | dealer'

metodos
=> transferencia: verificar se o mock autoriza a transação, verificar saldo do usuario, só após,criar uma transferencia
=> Deposito: depositar valor em conta, só pode ser o mesmo usuario

> Transferencia:
> data de criação
> id
> valor
> de quem
> para quem

metodo: enviar email para o cliente que recebeu e para o cliente que pagou
