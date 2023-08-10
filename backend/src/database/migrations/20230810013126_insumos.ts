import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Insumos", (table) => {
    table.uuid("id");
    table.string("nome");
    table.integer("quantidade_disponivel");
    table.float("custo");
    table.string("fornecedor");
    table.date("data_validade");
  });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("insumos");
}
