'use client';
import { HomePageFilters } from '@/constants/filters';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { useSearchParams, useRouter } from 'next/navigation';
import { formUrlQuery } from '@/lib/utils';

const HomeFilters = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [active, setActive] = useState<string>();

	const changeFilter = (filter: string) => {
		if (filter === active) {
			setActive('');
			const newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: 'filter',
				value: null,
			});
			router.push(newUrl, { scroll: false });
		} else {
			setActive(filter);
			const newUrl = formUrlQuery({
				params: searchParams.toString(),
				key: 'filter',
				value: filter,
			});
			router.push(newUrl, { scroll: false });
		}
	};

	return (
		<div className='mt-10 hidden flex-wrap gap-3 md:flex'>
			{HomePageFilters.map((filter) => (
				<Button
					key={filter.value}
					onClick={() => changeFilter(filter.value)}
					className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
						active === filter.value
							? 'bg-primary-100 text-primary-500 hover:bg-primary-500 dark:bg-primary-500 dark:text-primary-500 dark:hover:bg-dark-400'
							: 'bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300'
					}`}
				>
					{filter.name}
				</Button>
			))}
		</div>
	);
};

export default HomeFilters;
