import growlManager from 'shared/classes/growlmanager';
import XIcon from 'shared/components/icons/xicon';
import GrowlStage from 'shared/enums/growlstage';
import GrowlRecord from 'shared/types/growlrecord';

function GrowlInstance({ growl }: { growl: GrowlRecord }) {
  return (
    <div
      key={growl.id}
      class={
        'bg-bg-0 z-20 flex w-max items-center gap-1 rounded-md p-3 text-lg shadow-lg! transition-opacity duration-1000 ' +
        (growl.stage === GrowlStage.Fade ? 'opacity-0' : '')
      }
    >
      <p class="mx-2 w-max shrink-0">{growl.content}</p>
      <button
        onClick={growl.close}
        class="hover:bg-bg-button active:bg-bg-button-hover h-9 w-9 rounded-sm p-[6px]"
      >
        <XIcon />
      </button>
    </div>
  );
}

export default function GrowlStack() {
  return (
    <div class="absolute right-0 bottom-0 flex flex-col items-end gap-4 p-4">
      {growlManager.growlList.value.map((g) => (
        <GrowlInstance growl={g} />
      ))}
    </div>
  );
}
