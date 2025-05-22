import { useContext } from 'preact/hooks';
import { UserCircle } from 'shared/components/usercircle/usercircle';
import { TabList } from 'src/components/tablist';
import { showDialog } from 'src/state/functions/showdialog';
import { StateContext } from 'src/state/statecontext';

export function TitleRow() {
  const { user } = useContext(StateContext);

  return (
    <div class="bg-bg-4 flex h-12 w-full">
      <h1 class="mx-3 self-center text-[1.7rem] font-bold whitespace-nowrap">JChords Editor</h1>
      <div class="relative flex h-full grow items-end">
        <div class="absolute h-full w-4 bg-[linear-gradient(90deg,var(--color-bg-4),transparent)]"></div>
        <TabList />
        <div class="absolute right-0 h-full w-4 bg-[linear-gradient(270deg,var(--color-bg-4),transparent)]"></div>
      </div>
      <div class="mx-1 h-12 w-12 shrink-0 p-1.5">
        <UserCircle user={user.value} showDialog={showDialog} />
      </div>
    </div>
  );
}
