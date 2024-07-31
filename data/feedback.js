import { fetchWithResponse } from "./fetcher"

export function sendFeedback(feedback) {
    return fetchWithResponse('feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(feedback)
    })
  }