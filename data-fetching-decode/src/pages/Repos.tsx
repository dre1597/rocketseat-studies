import axios from 'axios';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

export type TRepository = {
  full_name: string;
  description: string;
};

export function Repos() {
  const { data: repositories, isFetching } = useQuery<TRepository[]>(
    'repos',
    async () => {
      const response = await axios.get(
        'https://api.github.com/users/dre1597/repos'
      );

      return response.data;
    },
    { staleTime: 1000 * 60 }
  );

  return (
    <ul>
      {isFetching && <p>Loading...</p>}
      {repositories?.map((repo) => {
        return (
          <li key={repo.full_name}>
            <Link to={`repos/${repo.full_name}`}>{repo.full_name}</Link>
            <p>{repo.description}</p>
          </li>
        );
      })}
    </ul>
  );
}
