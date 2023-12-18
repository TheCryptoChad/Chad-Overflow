'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';

interface LocalSearchProps {
	route: string;
	iconPosition: string;
	imgSrc: string;
	placeholder: string;
	otherClasses?: string;
}

const LocalSearch = ({ route, iconPosition, imgSrc, placeholder, otherClasses }: LocalSearchProps) => {
	return (
		<div className={`background-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}>
			{iconPosition === 'left' && (
				<Image
					src={imgSrc}
					alt='search icon'
					width={24}
					height={24}
					className='cursor-pointer'
				/>
			)}
			<Input
				type='tex'
				placeholder={placeholder}
				value=''
				onChange={() => {}}
				className='paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none'
			/>
			{iconPosition === 'right' && (
				<Image
					src={imgSrc}
					alt='search icon'
					width={24}
					height={24}
					className='cursor-pointer'
				/>
			)}
		</div>
	);
};

export default LocalSearch;
