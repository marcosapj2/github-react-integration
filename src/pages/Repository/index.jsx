import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import { Owner } from './styles';
import Container from '../../components/Container';
import Loading from '../../components/Loading';
import Pagination from '../../components/Pagination';
import Buttons from './Buttons';
import Issues from './Issues';

export default class Repository extends Component {
  constructor(props) {
    super(props);

    const searchParams = new URLSearchParams(props.location.search);
    const { state, page } = Object.fromEntries(searchParams);

    this.perPage = 5;
    this.accessToken = '3f4516d9a520c25c6958e0f3157dd19810f346fd';
    this.state = {
      repository: {},
      issues: [],
      loading: true,
      loadingIssues: false,
      issuesState: state || 'all',
      page: Number(page) || 1,
    };
  }

  async componentDidMount() {
    const { match, history } = this.props;
    const { issuesState: state, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);
    try {
      const [repository, issues] = await Promise.all([
        api.get(`/repos/${repoName}`, {
          params: { access_token: this.accessToken },
        }),
        api.get(`/repos/${repoName}/issues`, {
          params: {
            state,
            page,
            per_page: this.perPage,
            access_token: this.accessToken,
          },
        }),
      ]);

      history.replace(
        `/repository/${encodeURIComponent(
          repoName
        )}/issues?state=${state}&page=${page}`
      );

      this.setState({
        repository: repository.data,
        issues: issues.data,
        loading: false,
      });
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  }

  loadIssues = async (state, page) => {
    const { match, history } = this.props;
    const { issuesState } = this.state;
    const repoName = decodeURIComponent(match.params.repository);

    if (issuesState !== state)
      this.setState({ loadingIssues: true, issuesState: state });
    else this.setState({ page });
    try {
      const { data: issues } = await api.get(`/repos/${repoName}/issues`, {
        params: {
          state,
          per_page: this.perPage,
          page,
          access_token: this.accessToken,
        },
      });

      history.replace(
        `/repository/${encodeURIComponent(
          repoName
        )}/issues?state=${state}&page=${page}`
      );
      this.setState({ issues });
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    } finally {
      if (issuesState !== state) this.setState({ loadingIssues: false });
    }
  };

  setIssuesState = async ({ target: { id: state } }) => {
    const { page } = this.state;
    this.loadIssues(state, page);
  };

  changePage = async page => {
    const { issuesState: state } = this.state;
    this.loadIssues(state, page);
  };

  render() {
    const {
      repository,
      loading,
      loadingIssues,
      page,
      issuesState,
      issues,
    } = this.state;

    if (loading) return <Loading />;

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <Buttons state={issuesState} setState={this.setIssuesState} />
        <Issues issues={issues} loading={loadingIssues} />
        <Pagination page={page} changePage={this.changePage} />
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    replace: PropTypes.func,
  }).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};
