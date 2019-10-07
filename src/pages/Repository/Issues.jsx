import React from 'react';
import PropTypes from 'prop-types';
import { IssueList } from './styles';
import Loading from '../../components/Loading';

const Issues = ({ issues, loading }) => (
  <IssueList>
    {issues.map(issue => (
      <li key={String(issue.id)}>
        <img src={issue.user.avatar_url} alt={issue.user.login} />
        <div id="issue-details">
          <strong>
            <a href={issue.html_url}>{issue.title}</a>
            {issue.labels.map(label => (
              <span key={String(label.id)}>{label.name}</span>
            ))}
          </strong>
          <p>{issue.user.login}</p>
        </div>
      </li>
    ))}
    {loading && <Loading background="#fff" color="#333" />}
  </IssueList>
);

Issues.defaultProps = {
  issues: [],
};

Issues.propTypes = {
  issues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      html_url: PropTypes.string,
      title: PropTypes.string,
      labels: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        })
      ),
      user: PropTypes.shape({
        avatar_url: PropTypes.string,
        login: PropTypes.string,
      }),
    })
  ),
  loading: PropTypes.bool.isRequired,
};

export default Issues;
