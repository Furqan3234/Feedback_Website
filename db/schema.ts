import { pgTable, serial, text, integer, timestamp, varchar } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: text('password').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('user'), // 'admin' or 'user'
  createdAt: timestamp('created_at').defaultNow(),
});

export const feedbacks = pgTable('feedbacks', {
  id: serial('id').primaryKey(),
  userEmail: varchar('user_email', { length: 255 }).notNull(),
  schoolName: varchar('school_name', { length: 255 }).notNull(),
  
  // Rating questions (1-5 scale)
  foodQualityRating: integer('food_quality_rating').notNull(), // How would you rate the overall food quality?
  foodTasteRating: integer('food_taste_rating').notNull(), // How would you rate the taste of the meals?
  portionSizeRating: integer('portion_size_rating').notNull(), // How satisfied are you with the portion sizes?
  foodTemperatureRating: integer('food_temperature_rating').notNull(), // How would you rate the temperature of the food served?
  varietyRating: integer('variety_rating').notNull(), // How would you rate the variety of meals offered?
  presentationRating: integer('presentation_rating').notNull(), // How would you rate the presentation of the food?
  hygieneRating: integer('hygiene_rating').notNull(), // How would you rate the hygiene standards?
  
  // Additional text inputs
  favoriteItem: varchar('favorite_item', { length: 255 }),
  leastFavoriteItem: varchar('least_favorite_item', { length: 255 }),
  
  // Final paragraph
  suggestions: text('suggestions'),
  
  createdAt: timestamp('created_at').defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Feedback = typeof feedbacks.$inferSelect;
export type NewFeedback = typeof feedbacks.$inferInsert;
