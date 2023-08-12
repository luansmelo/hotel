import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("input", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("nome").notNullable();
    table.integer("quantidade").defaultTo(0);
    table.string("unidade_associativa").nullable();
    table.float("unidade_de_medida").nullable();
    table.float("custo_por_unidade").nullable();
    table.string("fornecedor").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("input");
}
