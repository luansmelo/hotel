import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("dish", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.string("variant").notNullable();
    table.string("method_preparation").nullable();
    table.string("programming").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("dish");
}
