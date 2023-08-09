import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("Itens_DA140", (table) => {
    table.uuid("id");
    table.integer("total_pratos");
    table.integer("ft_em_cadastro");
    table.decimal("status");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("Itens_DA140");
}
