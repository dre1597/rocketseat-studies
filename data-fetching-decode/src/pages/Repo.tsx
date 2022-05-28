import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { TRepository } from './Repos';

export function Repo() {
  const params = useParams();
  const currentRepository = params['*'] as string;

  const queryClient = useQueryClient();

  async function handleChangeRepositoryDescription() {
    const previousRepos = queryClient.getQueryData<TRepository[]>('repos');

    if (previousRepos) {
      const nextRepos = previousRepos.map((repo) => {
        if (repo.full_name === currentRepository) {
          return { ...repo, description: 'Testing' };
        }
        return repo;
      });

      queryClient.setQueryData('repos', nextRepos);
    }
  }
  return (
    <div>
      <h1>{currentRepository}</h1>
      <button onClick={handleChangeRepositoryDescription}>Change</button>
    </div>
  );
}
