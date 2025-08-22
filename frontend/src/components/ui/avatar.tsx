import { UserInfo } from 'shared/types/userinfo';
import { UserIcon } from 'src/components/ui/icons/usericon';

interface UserAvatarProps {
  user?: UserInfo | null;
  className?: string;
}

export function Avatar(props: UserAvatarProps) {
  const letter = props.user?.displayName?.charAt(0)?.toUpperCase() ?? '_';
  return (
    <div className={`h-full w-full shrink-0 overflow-hidden rounded-full ${props.className}`}>
      {props.user ? (
        props.user.photoURL ? (
          <img className="h-full w-full object-cover" src={props.user.photoURL} />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-blue-600 text-xl font-bold text-white">
            {letter}
          </div>
        )
      ) : (
        <UserIcon className="h-full w-full" />
      )}
    </div>
  );
}
