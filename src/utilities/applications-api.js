// API modules are where the code lives to communicate
// with the server via AJAX
import sendRequest from './send-request';
const BASE_URL = '/api/applications';

export function getMyApplications() {
  return sendRequest(BASE_URL, 'GET');
}
