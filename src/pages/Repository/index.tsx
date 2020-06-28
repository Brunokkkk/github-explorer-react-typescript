import React from 'react';
import { useRouteMatch } from 'react-router-dom';

interface RepositoryParams {
  repository: string;
}

const Profile: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();
  return <h1> Hola: {params.repository} </h1>;
};

export default Profile;
