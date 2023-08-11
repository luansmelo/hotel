import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("insumos", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("nome").notNullable();
    table.integer("quantidade_disponivel").defaultTo(0);;
    table.float("custo").nullable();
    table.string("fornecedor").nullable();
    table.date("data_validade").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("insumos");
}
