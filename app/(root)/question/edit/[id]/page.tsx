import Question from '@/components/forms/Question';
import { getQuestionById } from '@/lib/actions/question.action';
import { getUserById } from '@/lib/actions/user.action';
import { auth } from '@clerk/nextjs';
import { Fragment } from 'react';

const Page = async ({ params }: any) => {
	const { userId } = auth();
	if (!userId) return null;

	const mongoUser = await getUserById({ userId });
	const result = await getQuestionById({ questionId: params.id });

	return (
		<Fragment>
			<h1 className='h1-bold text-dark100_light900'>Edit Question</h1>
			<div className='mt-9'>
				<Question
					type='edit'
					mongoUserId={mongoUser._id}
					questionDetails={JSON.stringify(result)}
				/>
			</div>
		</Fragment>
	);
};

export default Page;
