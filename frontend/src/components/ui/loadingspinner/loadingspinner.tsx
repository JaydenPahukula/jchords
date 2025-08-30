interface LoadingSpinnerProps {
  className?: string;
}

/** Not recommended to have size > 6 */
export default function LoadingSpinner(props: LoadingSpinnerProps) {
  return (
    <div className={'my-loading-spinner ' + props.className}>
      <div className="my-loading-spinner-bar"></div>
      <div className="my-loading-spinner-bar rotate-30 [animation-delay:_-0.75s]" />
      <div className="my-loading-spinner-bar rotate-60 [animation-delay:_-1.5s]" />
      <div className="my-loading-spinner-bar rotate-90 [animation-delay:_-0.45s]" />
      <div className="my-loading-spinner-bar rotate-120 [animation-delay:_-1.2s]" />
      <div className="my-loading-spinner-bar rotate-150 [animation-delay:_-0.15s]" />
      <div className="my-loading-spinner-bar rotate-180 [animation-delay:_-0.9s]" />
      <div className="my-loading-spinner-bar rotate-210 [animation-delay:_-1.65s]" />
      <div className="my-loading-spinner-bar rotate-240 [animation-delay:_-0.6s]" />
      <div className="my-loading-spinner-bar rotate-270 [animation-delay:_-1.35s]" />
      <div className="my-loading-spinner-bar rotate-300 [animation-delay:_-0.3s]" />
      <div className="my-loading-spinner-bar rotate-330 [animation-delay:_-1.15s]" />
    </div>
  );
}
