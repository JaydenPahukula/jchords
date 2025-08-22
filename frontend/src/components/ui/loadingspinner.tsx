interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner(props: LoadingSpinnerProps) {
  return (
    <div
      className={`box-border aspect-square h-5 w-5 animate-spin rounded-full border-3 border-[currentColor] border-t-[transparent] ${props.className}`}
    />
  );
}
