import QuestionCard from '@/components/cards/QuestionCard';
import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import LocalSearch from '@/components/shared/search/LocalSearch';
import { QuestionFilters } from '@/constants/filters';
import { IQuestion } from '@/database/question.model';
import { getQuestionsByTagId } from '@/lib/actions/tag.action';
import React, { Fragment } from 'react';

const Page = async ({ params, searchParams }) => {
	const result = await getQuestionsByTagId({
		tagId: params.id,
		page: 1,
		searchQuery: searchParams.q,
	});

	return (
		<Fragment>
			<h1 className='h1-bold text-dark100_light900'>{result.tagTitle}</h1>
			<div className='mt-11 w-full'>
				<LocalSearch
					route='/'
					iconPosition='left'
					imgSrc='/assets/icons/search.svg'
					placeholder='Search for questions'
					otherClasses='flex-1'
				/>
			</div>

			<div className='mt-10 flex w-full flex-col gap-6'>
				{result.questions.length > 0 ? (
					result.questions.map((question: IQuestion) => (
						<QuestionCard
							key={question._id}
							_id={question._id}
							title={question.title}
							tags={question.tags}
							author={question.author}
							upvotes={question.upvotes}
							views={question.views}
							answers={question.answers}
							createdAt={question.createdAt}
						/>
					))
				) : (
					<NoResult
						title="There's no tag questions to show"
						description='Be the first to break the silence! Ask a Question and kickstart the discussion, your query could be the next big thing others learn from. Get involved!'
						link='/ask-question'
						linkTitle='Ask a Question'
					/>
				)}
			</div>
		</Fragment>
	);
};

export default Page;