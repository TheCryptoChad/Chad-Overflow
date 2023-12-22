'use client';

import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

interface VotesProps {
	type: string;
	itemId: string;
	userId: string;
	upvotes: number;
	hasUpvoted: boolean;
	downvotes: number;
	hasDownvoted: boolean;
	hasSaved?: boolean;
}

const Votes = ({ type, itemId, userId, upvotes, hasUpvoted, downvotes, hasDownvoted, hasSaved }: VotesProps) => {
	const handleSave = async () => {};
	const pathname = usePathname();

	const handleVote = async (voteType: string) => {
		try {
			if (!userId) return;

			if (voteType === 'upvote') {
				if (type === 'question') {
					await upvoteQuestion({
						questionId: JSON.parse(itemId),
						userId: JSON.parse(userId),
						hasupVoted: hasUpvoted,
						hasdownVoted: hasDownvoted,
						path: pathname,
					});
				} else if (type === 'answer') {
					// await upvoteAnswer({
					// 	questionId: JSON.parse(itemId),
					// 	userId: JSON.parse(userId),
					// 	hasupVoted: hasUpvoted,
					// 	hasdownVoted: hasDownvoted,
					// 	path: pathname,
					// });
				}
			}

			if (voteType === 'downvote') {
				if (type === 'question') {
					await downvoteQuestion({
						questionId: JSON.parse(itemId),
						userId: JSON.parse(userId),
						hasupVoted: hasUpvoted,
						hasdownVoted: hasDownvoted,
						path: pathname,
					});
				} else if (type === 'answer') {
					// await downvoteAnswer({
					// 	questionId: JSON.parse(itemId),
					// 	userId: JSON.parse(userId),
					// 	hasupVoted: hasUpvoted,
					// 	hasdownVoted: hasDownvoted,
					// 	path: pathname,
					// });
				}
			}
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<div className='flex gap-5'>
			<div className='flex-center gap-2.5'>
				<div className='flex-center gap-1.5'>
					<Image
						src={hasUpvoted ? '/assets/icons/upvoted.svg' : '/assets/icons/upvote.svg'}
						width={18}
						height={18}
						alt='upvote'
						className='cursor-pointer'
						onClick={() => handleVote('upvote')}
					/>
					<div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
						<p className='subtle-medium text-dark400_light900'>{formatNumber(upvotes)}</p>
					</div>
				</div>
			</div>
			<div className='flex-center gap-2.5'>
				<div className='flex-center gap-1.5'>
					<Image
						src={hasDownvoted ? '/assets/icons/downvoted.svg' : '/assets/icons/downvote.svg'}
						width={18}
						height={18}
						alt='downvote'
						className='cursor-pointer'
						onClick={() => handleVote('downvote')}
					/>
					<div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
						<p className='subtle-medium text-dark400_light900'>{formatNumber(downvotes)}</p>
					</div>
				</div>
			</div>
			<Image
				src={hasSaved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-red.svg'}
				width={18}
				height={18}
				alt='star'
				className='cursor-pointer'
				onClick={handleSave}
			/>
		</div>
	);
};

export default Votes;
