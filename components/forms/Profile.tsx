'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { useForm } from 'react-hook-form';
import { ProfileSchema } from '@/lib/validations';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { updateUser } from '@/lib/actions/user.action';

interface Props {
	clerkId: string;
	user: string;
}

const Profile = ({ clerkId, user }: Props) => {
	const parsedUser = JSON.parse(user);
	const router = useRouter();
	const pathname = usePathname();
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const form = useForm<z.infer<typeof ProfileSchema>>({
		resolver: zodResolver(ProfileSchema),
		defaultValues: {
			name: parsedUser.name || '',
			username: parsedUser.username || '',
			portfolioWebsite: parsedUser.portfolioWebsite || '',
			location: parsedUser.location || '',
			bio: parsedUser.bio || '',
		},
	});

	const onSubmit = async (values: z.infer<typeof ProfileSchema>) => {
		setIsSubmitting(true);
		try {
			await updateUser({
				clerkId,
				updateData: {
					name: values.name,
					username: values.username,
					portfolioWebsite: values.portfolioWebsite,
					location: values.location,
					bio: values.bio,
				},
				path: pathname,
			});
			router.back();
		} catch (error: any) {
			console.log(error);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<Form {...form}>
			<form
				className='mt-9 flex w-full flex-col gap-9'
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem className='space-y-3.5'>
							<FormLabel className='paragraph-semibold text-dark400_light800'>
								Name <span className='text-primary-500'>*</span>
							</FormLabel>
							<FormControl className='mt-3.5'>
								<Input
									placeholder='Your name'
									className='no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='username'
					render={({ field }) => (
						<FormItem className='space-y-3.5'>
							<FormLabel className='paragraph-semibold text-dark400_light800'>
								Username <span className='text-primary-500'>*</span>
							</FormLabel>
							<FormControl className='mt-3.5'>
								<Input
									placeholder='Your username'
									className='no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='portfolioWebsite'
					render={({ field }) => (
						<FormItem className='space-y-3.5'>
							<FormLabel className='paragraph-semibold text-dark400_light800'>Portfolio Link</FormLabel>
							<FormControl className='mt-3.5'>
								<Input
									type='url'
									placeholder='Your portfolio URL'
									className='no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='location'
					render={({ field }) => (
						<FormItem className='space-y-3.5'>
							<FormLabel className='paragraph-semibold text-dark400_light800'>Location</FormLabel>
							<FormControl className='mt-3.5'>
								<Input
									placeholder='Where are you from?'
									className='no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='bio'
					render={({ field }) => (
						<FormItem className='space-y-3.5'>
							<FormLabel className='paragraph-semibold text-dark400_light800'>
								Bio <span className='text-primary-500'>*</span>
							</FormLabel>
							<FormControl className='mt-3.5'>
								<Textarea
									placeholder={`What's special about you?`}
									className='no-focus paragraph-regular light-border-2 background-light700_dark300 text-dark300_light700 min-h-[56px] border'
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='mt-7 flex justify-end'>
					<Button
						type='submit'
						className='primary-gradient w-fit text-white'
						disabled={isSubmitting}
					>
						{isSubmitting ? 'Saving...' : 'Save'}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export default Profile;
