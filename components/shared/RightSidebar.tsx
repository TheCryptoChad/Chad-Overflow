import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import RenderTag from './RenderTag';

const hotQuestions = [
	{ _id: '1', title: 'How do I use express as a custom server in NextJS?' },
	{ _id: '2', title: 'How do I use express as a custom server in NextJS?' },
	{ _id: '3', title: 'How do I use express as a custom server in NextJS?' },
	{ _id: '4', title: 'How do I use express as a custom server in NextJS?' },
	{ _id: '5', title: 'How do I use express as a custom server in NextJS?' },
];

const popularTags = [
	{ _id: '1', name: 'Javascript', totalQuestions: 100 },
	{ _id: '1', name: 'Javascript', totalQuestions: 100 },
	{ _id: '1', name: 'Javascript', totalQuestions: 100 },
	{ _id: '1', name: 'Javascript', totalQuestions: 100 },
	{ _id: '1', name: 'Javascript', totalQuestions: 100 },
];

const RightSidebar = () => {
	return (
		<section className='custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
			<div>
				<h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
				<div className='mt-7 flex w-full flex-col gap-[30px]'>
					{hotQuestions.map((hotQuestion) => (
						<Link
							key={hotQuestion._id}
							href={`/questions/${hotQuestion._id}`}
							className='flex cursor-pointer items-center justify-between gap-7'
						>
							<p className='body-medium text-dark500_light700'>{hotQuestion.title}</p>
							<Image
								src='/assets/icons/chevron-right.svg'
								alt='chevron right'
								width={20}
								height={20}
								className='invert-colors'
							/>
						</Link>
					))}
				</div>
			</div>
			<div className='mt-16'>
				<h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
				<div className='mt-7 flex flex-col gap-4'>
					{popularTags.map((popularTag) => (
						<RenderTag
							key={popularTag._id}
							_id={popularTag._id}
							name={popularTag.name}
							totalQuestions={popularTag.totalQuestions}
							showCount
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default RightSidebar;
