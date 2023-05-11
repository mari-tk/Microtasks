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

export function editJob(job) {
  return sendRequest(`${BASE_URL}/${job._id}`, 'PUT', job);
}

export function deleteJob(id) {
  return sendRequest(`${BASE_URL}/${id}`, 'DELETE');
}

export function applyForJob(application) {
  return sendRequest(`${BASE_URL}/${application.jobId}/apply`, 'POST', application);
}

export function getJobApplications(id) {
  return sendRequest(`${BASE_URL}/${id}/applications`, 'GET');
}

// export function getJobApplications(id) {
//   return sendRequest(`${BASE_URL}/${id}`, 'GET');
// }