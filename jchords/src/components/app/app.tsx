import HomeHeader from 'src/components/homeheader/homeheader';
import app from 'src/shared/firebase/app';

export default function App() {
  console.log(app);

  return (
    <div id="app" class="h-full min-h-screen w-full bg-bg2">
      <HomeHeader />
    </div>
  );
}
