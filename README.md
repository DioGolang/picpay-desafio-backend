
# Desafio Back-end PicPay

---

Observei vários programadores com vídeos no YouTube no desafio do PicPay, então resolvi buscar na internet e, para minha felicidade, encontrei o seguinte repositório: [repositório](https://github.com/PicPay/picpay-desafio-backend)

Irei fazer com varias linguagens de programação:
- Nodejs, 
- Golang, 
- Python, 
- PHP. 

Com seguintes frameworks: 
- Nestjs, 
- Django, 
- Laravel. 

Iniciei com NestJS e farei algumas melhorias antes de partir para outras tecnologias. Este projeto segue os princípios de Clean Architecture, Domain-Driven Design (DDD), e SOLID. Uma curiosidade: o principal princípio que observei e que foi crucial para o desenvolvimento do projeto foi o Princípio da Substituição de Liskov (Liskov Substitution Principle):

> Let q(x) be a property provable about objects of x of type T. Then q(y) should be provable for objects y of type S where S is a subtype of T.

## Clean Architecture

Clean Architecture separa o código em camadas independentes, permitindo fácil manutenção e escalabilidade. As camadas são:

- **Core**: Contém a lógica de negócios e as entidades, implementando as regras fundamentais do sistema.

- **Use Cases**: Define os casos de uso, que orquestram a interação entre as entidades e os serviços.

- **Interfaces**: Define interfaces que são implementadas pelas camadas externas.

- **Infrastructure**: Contém a implementação concreta dos repositórios, serviços externos e outros componentes de infraestrutura.

## Domain-Driven Design (DDD)

DDD nos permite modelar o domínio da aplicação com precisão, mantendo a complexidade sob controle. Os principais componentes são:

- **Entidades**: Objetos com identidade distinta, como User e Store.
- **Value Objects**: Objetos imutáveis que descrevem aspectos do domínio, como Money.
- **Repositórios**: Interfaces para acessar dados persistidos.
- **Serviços de Domínio**: Implementam lógica de negócios que não se encaixa naturalmente em entidades ou value objects.

## Princípios SOLID

Os princípios SOLID ajudam a manter o código limpo, organizado e fácil de manter:

- **Single Responsibility Principle (SRP)**: Cada classe tem uma única responsabilidade.
- **Open/Closed Principle (OCP)**: Classes são abertas para extensão, mas fechadas para modificação.
- **Liskov Substitution Principle (LSP)**: Objetos de uma classe derivada devem poder substituir objetos de sua classe base sem alterar o comportamento desejado.
- **Interface Segregation Principle (ISP)**: Muitas interfaces específicas são melhores do que uma única interface geral.
- **Dependency Inversion Principle (DIP)**: Dependa de abstrações, não de implementações concretas.

---

## Como o Projeto Atende a Esses Requisitos

### DDD

O projeto modela o domínio com precisão, utilizando entidades (User, Store, Transaction), value objects (Money), e serviços de domínio (TransferDomainService). A lógica de negócios é encapsulada nas entidades e nos serviços de domínio, facilitando a manutenção e a evolução do código.

### Clean Architecture

As camadas são claramente separadas, com as interfaces definidas no núcleo do aplicativo e implementações concretas nas camadas de infraestrutura. Isso permite que mudanças na infraestrutura (como a troca de um banco de dados) não afetem a lógica de negócios.

### SOLID

Cada classe no projeto tem uma única responsabilidade, e as dependências são injetadas, permitindo fácil substituição e teste. Por exemplo, a TransferDomainService orquestra a transferência de dinheiro entre usuários e lojistas, respeitando as regras de negócio definidas no domínio.

---

## Settings

1. crie uma arquivo .env: 

```dotenv
DATABASE_URL=
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
RABBITMQ_DEFAULT_USER=
RABBITMQ_DEFAULT_PASS=
RABBITMQ_QUEUE=notifications_queue
NOTIFICATION_EMAIL_URL='https://util.devi.tools/api/v1/notify'
AUTHORIZATION_URL='https://util.devi.tools/api/v2/authorize'
JWT_SECRET=
JWT_EXPIRES_IN=

```
2. crie as pastas na raiz: 
- docker/postgres 
- docker/rabbitmq_data

## Installation

```bash
$ docker compose up
```
```bash
$ npm install
```
```bash
$ npx prisma migrate dev 
```

## Running the app

```bash
$ npm run start:dev
```

---

## Objetivo: PicPay Simplificado

O PicPay Simplificado é uma plataforma de pagamentos simplificada. Nela é possível depositar e realizar transferências de dinheiro entre usuários. Temos 2 tipos de usuários, os comuns e lojistas, ambos têm carteira com dinheiro e realizam transferências entre eles.

### Requisitos

A seguir estão algumas regras de negócio que são importantes para o funcionamento do PicPay Simplificado:

Para ambos tipos de usuário, precisamos do Nome Completo, CPF, e-mail e Senha. CPF/CNPJ e e-mails devem ser únicos no sistema. Sendo assim, seu sistema deve permitir apenas um cadastro com o mesmo CPF ou endereço de e-mail;

Usuários podem enviar dinheiro (efetuar transferência) para lojistas e entre usuários;

Lojistas só recebem transferências, não enviam dinheiro para ninguém;

Validar se o usuário tem saldo antes da transferência;

Antes de finalizar a transferência, deve-se consultar um serviço autorizador externo, use este mock https://util.devi.tools/api/v2/authorize para simular o serviço utilizando o verbo GET;

A operação de transferência deve ser uma transação (ou seja, revertida em qualquer caso de inconsistência) e o dinheiro deve voltar para a carteira do usuário que envia;

No recebimento de pagamento, o usuário ou lojista precisa receber notificação (envio de email, sms) enviada por um serviço de terceiro e eventualmente este serviço pode estar indisponível/instável. Use este mock https://util.devi.tools/api/v1/notify)) para simular o envio da notificação utilizando o verbo POST;

Este serviço deve ser RESTFul.

> Tente ser o mais aderente possível ao que foi pedido, mas não se preocupe se não conseguir atender a todos os requisitos. Durante a entrevista vamos conversar sobre o que você conseguiu fazer e o que não conseguiu.


## Endpoint de transferência
Você pode implementar o que achar conveniente, porém vamos nos atentar somente ao fluxo de transferência entre dois usuários. A implementação deve seguir o contrato abaixo.

```http request
POST /transfer
Content-Type: application/json

{
  "value": 100.0,
  "payer": 4,
  "payee": 15
}
```
