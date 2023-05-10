// API modules are where the code lives to communicate
// with the server via AJAX
import sendRequest from './send-request';
const BASE_URL = '/api/jobs';

export function createJob(jobData) {
  return sendRequest(`${BASE_URL}/new`, 'POST', jobData);
}

export function getAllJobs() {
  return sendRequest(BASE_URL);
}

export function getJob(id) {
  return sendRequest(`${BASE_URL}/${id}`);
}

export function editJob(id) {
  return sendRequest(`${BASE_URL}/${id}/edit`, 'PUT', id);
}