import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("CustoMedio", (table) => {
    table.uuid("id").primary().defaultTo(knex.fn.uuid());
    table.string("desc_prod");
    table.decimal("custo_medio");
    table.integer("codigo");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("CustoMedio");
}
