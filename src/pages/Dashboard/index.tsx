/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Link } from 'react-router-dom';

import { Title, Form, Repositorys, Error } from './style';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Sign: React.FC = () => {
  const [inputError, setInputError] = useState('');
  const [newRepo, setNewRepo] = useState('');

  const [repositorys, setRepositorys] = useState<Repository[]>(() => {
    const storageRepository = localStorage.getItem(
      '@GithubExplorer:repositorys',
    );

    if (storageRepository) {
      return JSON.parse(storageRepository);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositorys',
      JSON.stringify(repositorys),
    );
  }, [repositorys]);

  async function handleAddRepositorys(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();
    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setNewRepo('');
      setInputError('');
      setRepositorys([...repositorys, repository]);
    } catch (Err) {
      setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
      <img src={logo} alt="Github explorer" />
      <Title> Explore repositórios no Github </Title>
      <Form hasError={!!inputError} onSubmit={handleAddRepositorys}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome aqui"
        />
        <button type="submit"> Pequisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositorys>
        {repositorys.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/Repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositorys>
    </>
  );
};

export default Sign;
