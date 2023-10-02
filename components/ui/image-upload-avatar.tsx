'use client';

import React, { useEffect, useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { Card, CardDescription, CardHeader, CardTitle } from './card';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
	disabled?: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}

const ImageUploadAvatar: React.FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onUpload = (result: any) => {
		onChange(result.info.secure_url);
	};

	if (!isMounted) {
		return null;
	}

	if (value.length === 0) {
		value = ['https://avatar.iran.liara.run/public/1']
	}

	return (
		<div className="">
			<div className="mb-4 flex items-center gap-4">
				<Card className="flex">
					{value.map((url) => (
						<div key={url} className="relative w-[120px] h-[120px] rounded-md overflow-hidden m-2">
							<div className="z-10 absolute bottom-2 right-1">
								<CldUploadWidget onUpload={onUpload} uploadPreset="sfkkn1yl">
									{({ open }) => {
										const onClick = () => {
											open();
										};

										return (
											<Button type="button" disabled={disabled} variant="secondary" onClick={onClick} className="rounded-full h-9 w-9 mt-3">
												+
											</Button>
										);
									}}
								</CldUploadWidget>
							</div>
							<Image fill className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center shadow-lg" alt="Image" src={url} />

						</div>
					))}
					<CardHeader>
						<CardTitle>Avatar</CardTitle>
						<CardDescription>Deploy your new project in one-click.</CardDescription>
					</CardHeader>
				</Card>
			</div>
		</div>
	);
};

export default ImageUploadAvatar;
