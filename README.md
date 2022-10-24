# API - Conversor de moedas
Serviço desenvolvido como resposta ao desafio da segunda etapa da empresa Jaya

## Visão da solução

### Desafio
Desenvolver uma API Rest que seja capaz de realizar a conversão entre duas moedas
utilizando taxas de conversões atualizadas de um serviço externo.

### Funcionalidades

> **Criar transação**
>> Criar transação e retornar ao usuário o valor convertido de acordo com o valor,
moeda de origem e moeda de destino

> **Buscar transações do usuário**
>> Buscar todas as transações criadas pelo usuário em questão

### Tecnologias
O projeto foi estruturado em Node.js e Typescript, segue abaixado cada tecnologia utilizada
e a motivação por traz da escolha

<details>
    <summary>Typescript</summary>
    <p>Além da familiaridade de projetos com tipagens estáticas no Javascript, quando se trata de
    produtividade, esta tecnologia possui diversas funcionalidades que deixam o código mais limpo e legível</p>
</details>

<details>
    <summary>Node</summary>
    <p>Também parto do principio que também é uma tecnologia familiar. Além de ser uma plataforma
    simples de trabalhar, tem sua construção de ambiente facilitada permitindo subir serviços em
    produção rapidamente</p>
</details>

<details>
    <summary>Express</summary>
    <p>Este framework é otimizado para construções de API. Além de ser compatível com as tipagens do Typescript,
trazendo um código legível e de fácil manutenção</p>
</details>

<details>
    <summary>Jest</summary>
    <p>Confesso que foi meu primeiro contato com esta estrutura de teste. Ela traz diversas funcionalidades,
principalmente quando queremos separar ambientes para testes unitários ou integração</p>
</details>

<details>
    <summary>Morgan & Winston</summary>
    <p>Uma aplicação sem registro de logs é muito difícil "debugar" para achar um problema. Com essas duas ferramentas
toda requisição será armazenada, e quando houver uma exceção também será registrado com a ajuda dos tratamentos de exceções</p>
</details>

<details>
    <summary>Prisma ORM</summary>
    <p>Eu sempre ouvi falar desse novo ORM para trabalhar com qualquer banco e linguagem. Decidi usar
porque diferente de outros ORM's ele possui uma tipagem segura e pronto para um desenvolvimento produtivo</p>
</details>

<details>
    <summary>Postgres</summary>
    <p>O banco foi pelo suporte intenso de fluxo de dados, penso que transações são feitas diariamente.
Além da alta compatibilidade com o ORM acima, todo gerenciamento é feito pelo Prisma CLI</p>
</details>

___





