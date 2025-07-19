import { Avatar, AvatarProps } from '@radix-ui/themes';
import { UserInfo } from 'shared/types/userinfo';

interface UserAvatarProps extends Omit<AvatarProps, 'src' | 'fallback'> {
  user: UserInfo;
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  const letter = user.displayName?.charAt(0)?.toUpperCase() ?? '_';

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
