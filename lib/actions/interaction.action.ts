'use server';

import { revalidatePath } from 'next/cache';
import Answer from '../../database/answer.model';
import { connectToDatabase } from '../mongoose';
import { ViewQuestionParams } from './shared.types';
import Question from '@/database/question.model';
import Interaction from '@/database/interaction.model';
import path from 'path';

export async function viewQuestion(params: ViewQuestionParams) {
	try {
		connectToDatabase();

		const { questionId, userId } = params;

		await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

		if (userId) {
			const existingInteraction = await Interaction.findOne({
				user: userId,
				action: 'view',
				question: questionId,
			});

			if (existingInteraction) return console.log('User has already viewed');

			await Interaction.create({
				user: userId,
				action: 'view',
				question: questionId,
			});
		}

		revalidatePath(path);
	} catch (error: any) {
		console.log(error);
		throw error;
	}
}
