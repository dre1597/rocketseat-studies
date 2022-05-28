import type { GetStaticProps, NextPage } from 'next';

type HomePageProps = {
  repositories: string[];
  date: string;
};

const Home: NextPage<HomePageProps> = ({ repositories, date }) => {
  return (
    <>
      {date}
      <ul>
        {repositories.map((repo) => (
          <li key={repo}>{repo}</li>
        ))}
      </ul>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('https://api.github.com/users/dre1597/repos');
  const data = await response.json();

  const repositoryNames = data.map((item: any) => item.name);

  return {
    props: {
      repositories: repositoryNames,
      date: new Date().toLocaleString(),
    },
    revalidate: 10,
  };
};
