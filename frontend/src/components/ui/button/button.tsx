import { ButtonHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router';
import LoadingSpinner from 'src/components/ui/loadingspinner/loadingspinner';

type ButtonVariant = 'primary' | 'secondary' | 'subtle';

interface CommonButtonProps {
  variant?: ButtonVariant;
  loading?: boolean;
}

interface ButtonButtonProps extends CommonButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  asLink?: false;
}

interface ButtonLinkProps extends CommonButtonProps, LinkProps {
  asLink: true;
}

type ButtonProps = ButtonButtonProps | ButtonLinkProps;

export function Button(props: ButtonProps) {
  const { asLink, variant = 'primary', loading, children, ...other } = props;

  const Component = asLink ? Link : HTMLButton;

  return (
    // @ts-expect-error idk why this errors
    <Component
      tabIndex={0}
      {...other}
      className={`my-button my-button-${variant} group ${other.className ?? ''}`}
      data-loading={loading || undefined}
    >
      <div aria-hidden={loading} className="flex items-center gap-2 group-data-loading:invisible">
        {children}
      </div>
      <div
        aria-hidden={!loading}
        className="absolute inset-0 flex items-center justify-center not-group-data-loading:hidden group-data-loading:visible"
      >
        <LoadingSpinner />
      </div>
    </Component>
  );
}

const HTMLButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} />;
