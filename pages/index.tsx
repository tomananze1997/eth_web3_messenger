import { MainContent } from 'components';
import type { NextPage } from 'next';
import { useDarkModeContext } from 'providers';

const Home: NextPage = () => {
  const [_, changeTheme] = useDarkModeContext();
  return (
    <>
      <button onClick={() => changeTheme()}>Change theme</button>
      <MainContent />
    </>
  );
};

export default Home;
