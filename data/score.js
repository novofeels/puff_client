import { fetchWithResponse } from './fetcher';

export function getLeaderboard() {
  return fetchWithResponse('scores/leaderboard', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  });
}

export function getUserScore() {
    return fetchWithResponse('scores/user-score', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    });
  }

  export function submitScore(score) {
    return fetchWithResponse('scores/submit-score', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(score)
    })
  }
