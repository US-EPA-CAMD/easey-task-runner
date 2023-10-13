require('dotenv').config();

import axios from 'axios';

const env = process.env.EASEY_ENV;
const apiKey = process.env.EASEY_API_KEY;
const ecmpsUser = process.env.EASEY_ECMPS_USERNAME;
const ecmpsPwd = process.env.EASEY_ECMPS_USERPWD;
const authUrl = `https://api.epa.gov/easey/${env}/auth-mgmt`;
const emissionsUrl = `https://api.epa.gov/easey/${env}/emissions-mgmt`;

export const exportEmissions = async (
  monPlanId: string,
  year: number,
  quarter: number,
) => {
  return axios.get(
    `${emissionsUrl}/emissions/export?api_key=${apiKey}&monitorPlanId=${monPlanId}&year=${year}&quarter=${quarter}&reportedValuesOnly=true`
  );
}

export const importEmissions = async (
  payload: string,
  token: string,
) => {
  return axios({
    method: "POST",
    url: `${emissionsUrl}/workspace/emissions/import?`,
    data: payload,
    headers: {
      authorization: `Bearer ${token}`,
      "x-api-key": apiKey
    }
  });
}

export const signIn = async () => {
  return axios({
    method: "POST",
    url: `${authUrl}/authentication/sign-in?`,
    data: {
      "userId": ecmpsUser,
      "password": ecmpsPwd
    },
    headers: {
      "x-api-key": apiKey
    }
  });
}

export const signOut = async (token: string) => {
  return axios({
    method: 'DELETE',
    url: `${authUrl}/authentication/sign-out?`,
    data: {
      "userId": ecmpsUser
    },
    headers: {
      authorization: `Bearer ${token}`,
      "x-api-key": apiKey
    }
  });
}
