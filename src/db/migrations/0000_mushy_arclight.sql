CREATE TABLE "interview_question_tags" (
	"question_id" uuid NOT NULL,
	"tag_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "interview_question_tags_question_id_tag_id_pk" PRIMARY KEY("question_id","tag_id")
);
--> statement-breakpoint
CREATE TABLE "interview_questions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"answer" text NOT NULL,
	"difficulty" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_published" boolean DEFAULT false NOT NULL,
	"published_at" timestamp,
	"publisher_id" varchar(255) NOT NULL,
	"is_vip" boolean DEFAULT false NOT NULL,
	CONSTRAINT "difficulty_check" CHECK (difficulty >= 1 AND difficulty <= 5)
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "interview_question_tags" ADD CONSTRAINT "interview_question_tags_question_id_interview_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."interview_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "interview_question_tags" ADD CONSTRAINT "interview_question_tags_tag_id_tags_id_fk" FOREIGN KEY ("tag_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;