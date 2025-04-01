export default function GenericHeader() {
  return (
    <div id="header" class="bg-bg-0 z-[1] flex h-18 flex-shrink-0 justify-center !shadow-md">
      <div id="header-content" class="flex h-full w-full max-w-5xl items-stretch gap-4 px-4">
        <div id="header-left" class="flex items-center">
          <a href="/">
            <h1 class="text-3xl font-bold sm:text-4xl">JChords</h1>
          </a>
        </div>
        <div id="header-right" class="flex grow items-center justify-end gap-4"></div>
      </div>
    </div>
  );
}
