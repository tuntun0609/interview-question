import { integer, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const postsTable = pgTable('posts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  userEmail: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
  tags: text().array(),
})

export type Post = typeof postsTable.$inferSelect
