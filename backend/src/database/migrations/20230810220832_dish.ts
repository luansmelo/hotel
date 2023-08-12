import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("dish", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("nome").notNullable();
    table.string("description").notNullable();
    table.string("variante").notNullable();
    table.string("modo_de_preparo").nullable();
    table.string("programacao").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("dish");
}
