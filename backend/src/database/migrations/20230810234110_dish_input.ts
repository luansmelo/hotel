import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("dish_input", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.uuid("dish_id").references("id").inTable("dish").onDelete("CASCADE");
    table
      .uuid("input_id")
      .references("id")
      .inTable("input")
      .onDelete("CASCADE");
    table.float("unit_measurement").notNullable();
    table.unique(["dish_id", "input_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("dish_input");
}
