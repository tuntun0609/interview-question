import { relations, sql } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  integer,
  boolean,
  uuid,
  primaryKey,
  varchar,
  check,
} from 'drizzle-orm/pg-core'

// 面试题表
export const interviewQuestions = pgTable(
  'interview_questions',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    question: text('question').notNull(),
    answer: text('answer').notNull(),
    difficulty: integer('difficulty').notNull(), // 1-5 难度等级
    createdAt: timestamp('created_at').defaultNow().notNull(), // 添加创建时间
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    isPublished: boolean('is_published').default(false).notNull(), // 是否已发布
    publishedAt: timestamp('published_at'), // 发布时间，未发布时为null
    publisherId: varchar('publisher_id', { length: 255 }).notNull(), // 限制长度
    isVip: boolean('is_vip').default(false).notNull(), // 是否为VIP题目
  },
  () => [
    // 添加约束：难度必须在1-5之间
    check('difficulty_check', sql`difficulty >= 1 AND difficulty <= 5`),
  ]
)

// 标签表
export const tags = pgTable('tags', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(), // 限制标签名长度，unique已有索引
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// 面试题与标签的关联表（多对多关系）
export const interviewQuestionTags = pgTable(
  'interview_question_tags',
  {
    questionId: uuid('question_id')
      .notNull()
      .references(() => interviewQuestions.id, { onDelete: 'cascade' }),
    tagId: uuid('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(), // 添加关联创建时间
  },
  table => [primaryKey({ columns: [table.questionId, table.tagId] })]
)

// 定义关系
export const interviewQuestionsRelations = relations(interviewQuestions, ({ many }) => ({
  tags: many(interviewQuestionTags),
}))

export const tagsRelations = relations(tags, ({ many }) => ({
  questions: many(interviewQuestionTags),
}))

export const interviewQuestionTagsRelations = relations(interviewQuestionTags, ({ one }) => ({
  question: one(interviewQuestions, {
    fields: [interviewQuestionTags.questionId],
    references: [interviewQuestions.id],
  }),
  tag: one(tags, {
    fields: [interviewQuestionTags.tagId],
    references: [tags.id],
  }),
}))
