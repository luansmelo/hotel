import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Cadastro_FT_Buffet", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("padrao_sistema");
    table.string("padre_cozinha");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Cadastro_FT_Buffet");
}
