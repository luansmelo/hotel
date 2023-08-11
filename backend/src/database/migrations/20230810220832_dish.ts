import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("dish", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.index("id");
    table.string("description");
    table.string("variante");
    table.string("modo_de_preparo");
    table.string("programacao");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("dish");
}
