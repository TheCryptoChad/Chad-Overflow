import { getUserAnswers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types';
import { Fragment } from 'react';
import AnswerCard from '../cards/AnswerCard';
import Pagination from './Pagination';

interface AnswerTabProps extends SearchParamsProps {
	userId: string;
	clerkId?: string | null;
}

const AnswerTab = async ({ searchParams, userId, clerkId }: AnswerTabProps) => {
	const result = await getUserAnswers({
		userId,
		page: searchParams?.page ? +searchParams.page : 1,
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
			<div className='mt-10'>
				<Pagination
					pageNumber={searchParams?.page ? +searchParams.page : 1}
					isNext={result.isNext}
				/>
			</div>
		</Fragment>
	);
};

export default AnswerTab;
