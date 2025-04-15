import TabList from 'src/components/tablist';

export default function TitleRow() {
  return (
    <div class="bg-bg-4 grid h-12 grid-cols-[min-content_auto] gap-3">
      <h1 class="mx-3 self-center text-[1.7rem] font-bold whitespace-nowrap">JChords Editor</h1>
      <TabList />
    </div>
  );
}
