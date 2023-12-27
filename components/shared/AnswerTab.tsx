import { getUserAnswers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import { Fragment } from 'react';
import AnswerCard from '../cards/AnswerCard';

interface AnswerTabProps extends SearchParamsProps {
	userId: string;
	clerkId?: string | null;
}

const AnswerTab = async ({ searchProps, userId, clerkId }: AnswerTabProps) => {
	const result = await getUserAnswers({
		userId,
		page: 1,
	});
	return (
		<Fragment>
			{result.answers.map((answer) => (
				<AnswerCard
					key={answer._id}
					_id={answer._id}
					clerkId={clerkId}
					question={answer.question}
					author={answer.author}
					upvotes={answer.upvotes.length}
					createdAt={answer.createdAt}
				/>
			))}
		</Fragment>
	);
};

export default AnswerTab;
