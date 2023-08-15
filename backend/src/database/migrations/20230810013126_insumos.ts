import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("input", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("nome").notNullable();
    table.integer("estoque_quantidade").defaultTo(0);
    table.string("unidade_associativa").notNullable();
    table.float("custo_por_unidade").notNullable();
    table.string("fornecedor").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("input");
}
