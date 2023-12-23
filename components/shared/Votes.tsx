'use client';

import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action';
import { viewQuestion } from '@/lib/actions/interaction.action';
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action';
import { toggleSaveQuestion } from '@/lib/actions/user.action';
import { formatNumber } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

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
	const pathname = usePathname();
	const router = useRouter();

	const handleSave = async () => {
		await toggleSaveQuestion({
			userId: JSON.parse(userId),
			questionId: JSON.parse(itemId),
			path: pathname,
		});
	};

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
					await upvoteAnswer({
						answerId: JSON.parse(itemId),
						userId: JSON.parse(userId),
						hasupVoted: hasUpvoted,
						hasdownVoted: hasDownvoted,
						path: pathname,
					});
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
					await downvoteAnswer({
						answerId: JSON.parse(itemId),
						userId: JSON.parse(userId),
						hasupVoted: hasUpvoted,
						hasdownVoted: hasDownvoted,
						path: pathname,
					});
				}
			}
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
		viewQuestion({
			questionId: JSON.parse(itemId),
			userId: userId ? JSON.parse(userId) : undefined,
		});
	}, [itemId, userId, pathname, router]);

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
			{type === 'question' && (
				<Image
					src={hasSaved ? '/assets/icons/star-filled.svg' : '/assets/icons/star-red.svg'}
					width={18}
					height={18}
					alt='star'
					className='cursor-pointer'
					onClick={handleSave}
				/>
			)}
		</div>
	);
};

export default Votes;
