import { fetchWithResponse, fetchWithoutResponse } from './fetcher';

export function getAchievements() {
  return fetchWithResponse('achievements', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    }
  });
}

export function createAchievement(achievementId) {
    return fetchWithoutResponse('achievements', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ achievement_id: achievementId })
    });
  }
  
  export function deleteAchievement(achievementId) {
    return fetchWithoutResponse(`achievements/${parseInt(achievementId)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`
      }
    });
  }