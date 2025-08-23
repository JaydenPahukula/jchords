import { UserInfo as FirebaseUserInfo } from 'firebase/auth';
import { UserIcon } from 'src/components/ui/icons/usericon';

interface UserAvatarProps {
  user: FirebaseUserInfo;
  className?: string;
}

export function Avatar(props: UserAvatarProps) {
  const letter = props.user.displayName?.charAt(0)?.toUpperCase();
  return (
    <div className={'my-avatar ' + props.className}>
      {props.user.photoURL ? (
        <img className="h-full w-full object-cover" src={props.user.photoURL} />
      ) : (
        (letter ?? <UserIcon />)
      )}
    </div>
  );
}
