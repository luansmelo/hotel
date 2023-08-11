# Sistema de Gerenciamento de Insumos de Cozinha para Hotéis

## Visão Geral
O sistema foi projetado especificamente para hotéis, visando otimizar a gestão de ingredientes e preparação de pratos em suas cozinhas. Ele permite a criação e gerenciamento de pratos, controle de insumos e a programação de cardápios diários/semanais.

## Funcionalidades

### 1. Cadastro de Pratos
- **Nome:** Principal identificador.
    - Importante para evitar confusões nos pedidos dos hóspedes.
        - Exemplo:
            - Camarão na Moranga Premium
            - Camarão na Moranga Clássico
- **Insumos:** Relaciona-se aos ingredientes necessários.
    - Descrição
    - Quantidade
    - Unidade de medida
    - Custo por unidade
- **Modo de Preparo:** (como observação)
- **Foto:** Possibilidade de fazer upload de fotos do prato.

### 2. Gerenciamento de Insumos
- Monitoramento do estoque de ingredientes.
- Alertas para níveis baixos de estoque.
- Registro de fornecedores e preços.

### 3. Visão de Cardápio
- **Programação Diária/Semanal:** Distribuir pratos em dias específicos.
- **Categorias de Refeições:** Classificar pratos em categorias como:
    - Café da manhã
    - Piscina
    - Almoço
    ... e outras categorias relevantes para o hotel.

### 4. CRUDS
- Funcionalidades de Criação, Leitura, Atualização e Deleção para:
    - Pratos
    - Insumos
    - Cardápio
    - Categorias de refeições

### 5. Relações
- Ligação entre pratos e insumos.
- Relação de pratos com o cardápio (datas e categorias).

### 6. Cálculos e Previsões
- **Quantidade de Preparo:** Especificar quantos pratos serão preparados.
    - Ajuste automático da quantidade de insumos necessários.
- Projeções baseadas nas estadias dos hóspedes e nas temporadas de pico.

### 7. Categorias e Subcategorias
- Dias da semana (Segunda, Terça, etc.).
- Tipos de refeição.

---

## Considerações Finais
