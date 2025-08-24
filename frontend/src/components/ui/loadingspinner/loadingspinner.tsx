interface LoadingSpinnerProps {
  className?: string;
}

export default function LoadingSpinner(props: LoadingSpinnerProps) {
  return <div className={'my-loading-spinner ' + props.className} />;
}
