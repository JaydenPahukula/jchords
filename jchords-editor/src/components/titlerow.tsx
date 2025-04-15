import TabList from 'src/components/tablist';

export default function TitleRow() {
  return (
    <div class="bg-bg-4 relative flex h-12 w-full overflow-hidden">
      <h1 class="mx-3 self-center text-[1.7rem] font-bold whitespace-nowrap">JChords Editor</h1>
      <div class="flex h-full grow items-end overflow-hidden">
        <div class="absolute h-full w-4 bg-[linear-gradient(90deg,var(--color-bg-4),transparent)]"></div>
        <TabList />
      </div>
    </div>
  );
}
