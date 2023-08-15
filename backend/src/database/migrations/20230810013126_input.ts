import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("input", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("name").notNullable();
    table.integer("stock_quantity").defaultTo(0);
    table.string("associative_unit").notNullable();
    table.float("cost_per_unit").notNullable();
    table.string("supplier").nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("input");
}
