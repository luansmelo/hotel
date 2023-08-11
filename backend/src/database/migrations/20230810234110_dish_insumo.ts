import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("dish_insumo", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.uuid("dish_id").references("id").inTable("dish").onDelete("CASCADE");
    table
      .uuid("insumo_id")
      .references("id")
      .inTable("insumos")
      .onDelete("CASCADE");
    table.integer("quantidade").notNullable();
    table.unique(["dish_id", "insumo_id"]);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("dish_insumo");
}
