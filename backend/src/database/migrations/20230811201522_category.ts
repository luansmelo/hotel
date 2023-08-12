import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("category", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("nome").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("category");
}
