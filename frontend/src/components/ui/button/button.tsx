import { ButtonHTMLAttributes } from 'react';
import { Link, LinkProps } from 'react-router';
import LoadingSpinner from 'src/components/ui/loadingspinner/loadingspinner';

type ButtonVariant = 'primary' | 'secondary' | 'subtle' | 'danger';

interface CommonButtonProps {
  variant?: ButtonVariant;
  loading?: boolean;
}

export interface ButtonButtonProps
  extends CommonButtonProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  asLink?: false;
}

export interface ButtonLinkProps extends CommonButtonProps, LinkProps {
  asLink: true;
}

export type ButtonProps = ButtonButtonProps | ButtonLinkProps;

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
      <div aria-hidden={loading ?? false} className="contents group-data-loading:invisible">
        {children}
      </div>
      {loading && (
        <div className="visible absolute inset-0 flex items-center justify-center">
          <LoadingSpinner className="size-6" />
        </div>
      )}
    </Component>
  );
}

const HTMLButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} />;
