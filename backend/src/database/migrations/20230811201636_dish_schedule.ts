import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("dish_schedule", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.uuid("dish_id").references("id").inTable("dish").onDelete("CASCADE");
    table.date("data_programada").notNullable();
    table
      .uuid("category_id")
      .references("id")
      .inTable("category")
      .onDelete("SET NULL");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("dish_schedule");
}
