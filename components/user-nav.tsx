'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CaretDownIcon, PersonIcon, PinRightIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function UserNav() {
  const router = useRouter();
  const session = useSession();
  const userRole = session.data?.user.role;
  const areaId = session.data?.user.areaId;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer">
          <div className="flex-1 flex-col space-y-1 mr-2">
            <div className="grid grid-rows-2 grid-flow-col">
              <p className="row text-sm font-medium leading-none ml-1">{session.data?.user.fullName}</p>
              <span className="bg-green-100 text-green-800 ml-auto text-xs font-medium left-5 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                {areaId != null
                  ? `Chief Trainer - Area ` + areaId.toUpperCase()
                  : userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}
              </span>
            </div>
          </div>

          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
          </Button>

          <div className="flex-2 flex-col space-y-1 ml-1 mt-2">
            <CaretDownIcon className="text-xl" />
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-58" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="col text-sm font-medium leading-none">{session.data?.user.fullName}</p>
              <p className="col text-xs leading-none text-muted-foreground mt-1">{session.data?.user.email}</p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push(`/${session.data?.user.role}/settings`)}>
            <PersonIcon className="mr-2" /> Manage Account
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {userRole === 'trainer' && (
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push(`/trainer/manage-certificates`)}>
              <PersonIcon className="mr-2" /> Manage Certificate
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}
        <DropdownMenuItem onClick={() => router.push('/api/auth/signout')} className="text-red-500">
          <PinRightIcon className="mr-2" /> Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
