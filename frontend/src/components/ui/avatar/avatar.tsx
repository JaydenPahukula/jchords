import { UserInfo as FirebaseUserInfo } from 'firebase/auth';
import { useRef } from 'react';
import { UserIcon } from 'src/components/ui/icons/usericon';

interface UserAvatarProps {
  user: FirebaseUserInfo;
  className?: string;
}

export function Avatar(props: UserAvatarProps) {
  const ref = useRef<HTMLDivElement>(null);

  const letter = props.user.displayName?.trim().charAt(0)?.toUpperCase();

  return (
    <div
      ref={ref}
      className={'my-avatar ' + props.className}
      style={{ fontSize: ref.current ? Math.trunc(ref.current.clientHeight * 0.5) : undefined }}
    >
      {props.user.photoURL ? (
        <img className="size-full object-cover" src={props.user.photoURL} />
      ) : (
        (letter ?? <UserIcon />)
      )}
    </div>
  );
}
