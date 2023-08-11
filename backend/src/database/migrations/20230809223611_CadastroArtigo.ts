import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("CadastroArtigo", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("genero");
    table.string("grupo");
    table.string("codigo");
    table.string("descricao_do_item");
    table.string("ua");
    table.decimal("custo_medio");
    table.string("flg_bloqueado");
    table.string("tipo_bloqueio");
    table.string("flg_ativo");
    table.string("estocavel");
    table.date("data_inclusao");
    table.string("usuario");
    table.integer("colunas1");
    table.string("genero_grupo");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("CadastroArtigo");
}
