import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Analise_Nomeclatura", (table) => {
    table.uuid("id");
    table.string("ft");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Analise_Nomeclatura");
}
