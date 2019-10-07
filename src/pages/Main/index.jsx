import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Container from '../../components/Container';
import { Form, SubmitButton, List, ErrorLabel } from './styles';
import api from '../../services/api';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newRepo: '',
      repositories: [],
      loading: false,
      error: '',
    };
  }

  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleChange = event => {
    this.setState({ newRepo: event.target.value });
  };

  handleSubmit = async event => {
    const { newRepo, repositories } = this.state;

    event.preventDefault();

    this.setState({ loading: true });

    const repositoryAlreadyExists = repositories.some(
      repository => repository.name === newRepo
    );

    const repositoryEmpty = !newRepo;
    try {
      if (repositoryAlreadyExists) {
        throw new Error('Repositório duplicado');
      }
      if (repositoryEmpty) {
        throw new Error('Digite o nome do repositório');
      }

      const response = await api.get(`repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
        error: '',
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, loading, repositories, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            id="new-repository"
            value={newRepo}
            onChange={this.handleChange}
            type="text"
            placeholder="Adicionar repositório"
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <ErrorLabel htmlFor="new-repository">{error}</ErrorLabel>
        <List>
          {repositories.map(repository => {
            return (
              <li key={repository.name}>
                <span>{repository.name}</span>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
              </li>
            );
          })}
        </List>
      </Container>
    );
  }
}

export default Main;
