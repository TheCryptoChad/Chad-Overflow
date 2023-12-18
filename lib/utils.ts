import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getTimeStap = (createdAt: Date): string => {
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
