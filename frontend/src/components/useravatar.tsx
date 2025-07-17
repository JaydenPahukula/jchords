import { Avatar, AvatarProps } from '@radix-ui/themes';

interface UserAvatarProps extends Omit<AvatarProps, 'src' | 'fallback'> {
  user: { email?: string; displayName?: string; photoURL?: string };
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  const letter = (user.displayName?.charAt(0) ?? user.email?.charAt(0))?.toUpperCase() ?? '_';

  return (
    <Avatar
      color="indigo"
      variant="soft"
      radius="full"
      src={user.photoURL ?? undefined}
      fallback={letter}
      {...props}
    />
  );
}
