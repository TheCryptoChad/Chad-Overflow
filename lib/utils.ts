import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import qs from 'query-string';
import { url } from 'inspector';
import { BADGE_CRITERIA } from '@/constants';
import { BadgeCounts } from '@/types';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getTimeStamp = (createdAt: Date): string => {
	const now: Date = new Date();
	const timeDifference: number = now.getTime() - createdAt.getTime();

	const minute: number = 60 * 1000;
	const hour: number = 60 * minute;
	const day: number = 24 * hour;
	const week: number = 7 * day;
	const month: number = 30 * day;
	const year: number = 365 * day;

	const seconds: number = Math.floor(timeDifference / 1000);
	const minutes: number = Math.floor(timeDifference / minute);
	const hours: number = Math.floor(timeDifference / hour);
	const days: number = Math.floor(timeDifference / day);
	const weeks: number = Math.floor(timeDifference / week);
	const months: number = Math.floor(timeDifference / month);
	const years: number = Math.floor(timeDifference / year);

	switch (true) {
		case timeDifference < minute:
			return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
		case timeDifference < hour:
			return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
		case timeDifference < day:
			return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
		case timeDifference < week:
			return `${days} ${days === 1 ? 'day' : 'days'} ago`;
		case timeDifference < month:
			return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
		case timeDifference < year:
			return `${months} ${months === 1 ? 'month' : 'months'} ago`;
		default:
			return `${years} ${years === 1 ? 'year' : 'years'} ago`;
	}
};

export const formatNumber = (num: number): string => {
	switch (true) {
		case num >= 1_000_000_000:
			return `${(num / 1_000_000_000).toFixed(2)}B`;
		case num >= 1_000_000:
			return `${(num / 1_000_000).toFixed(2)}M`;
		case num >= 1_000:
			return `${(num / 1_000).toFixed(2)}K`;
		default:
			return `${num}`;
	}
};

export const getJoinedDate = (date: Date): string => {
	const month = date.toLocaleString('default', { month: 'long' });
	const year = date.getFullYear();

	return `${month} ${year}`;
};

export const formUrlQuery = ({ params, key, value }: { params: string; key: string; value: string | null }) => {
	const currentUrl = qs.parse(params);
	currentUrl[key] = value;
	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	);
};

export const removeKeysFromQuery = ({ params, keys }: { params: string; keys: string[] }) => {
	const currentUrl = qs.parse(params);
	keys.forEach((key) => {
		delete currentUrl[key];
	});
	return qs.stringifyUrl(
		{
			url: window.location.pathname,
			query: currentUrl,
		},
		{ skipNull: true }
	);
};

interface BadgeParam {
	criteria: {
		type: keyof typeof BADGE_CRITERIA;
		count: number;
	}[];
}

export const assignBadges = (params: BadgeParam) => {
	const badgeCounts: BadgeCounts = {
		GOLD: 0,
		SILVER: 0,
		BRONZE: 0,
	};

	const { criteria } = params;

	criteria.forEach((item) => {
		const { type, count } = item;
		const badgeLevels: any = BADGE_CRITERIA[type];

		Object.keys(badgeLevels).forEach((level: any) => {
			if (count >= badgeLevels[level]) {
				badgeCounts[level] += 1;
			}
		});
	});

	return badgeCounts;
};
