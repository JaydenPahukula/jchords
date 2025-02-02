export default function LoadingSpinner(props: { class?: string }) {
  return (
    <div
      class={
        'box-border aspect-square animate-spin rounded-full border-4 border-[currentColor] border-t-[transparent] ' +
        (props.class ?? '')
      }
    ></div>
  );
}
