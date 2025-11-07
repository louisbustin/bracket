import { relations } from 'drizzle-orm';
import { bracket } from './bracket';
import { user } from './auth-schema';

export const userRelations = relations(user, ({ many }) => ({
	brackets: many(bracket)
}));

export const bracketRelations = relations(bracket, ({ one }) => ({
	user: one(user, {
		fields: [bracket.userId],
		references: [user.id]
	})
}));
