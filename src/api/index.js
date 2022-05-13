import axios from "axios";

const BASE_URL = "http://178.63.13.157:8090/mock-api/api";

const ENDPOINTS = {
  USERS: "users",
  PROJECTS: "projects",
  GATEWAYS: "gateways",
  REPORT: "report",
};

const failedRequest = ({ code }) => code < 200 || code >= 300;

export const getProjects = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${ENDPOINTS.PROJECTS}`);
    if (failedRequest(data)) throw data;

    return data.data.map(({ projectId, name }) => ({ id: projectId, name }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getGateways = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${ENDPOINTS.GATEWAYS}`);
    if (failedRequest(data)) throw data;

    return data.data.map(({ gatewayId, name }) => ({ id: gatewayId, name }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const generateReport = async (formData) => {
  const payload = {
    from: formData.fromData,
    to: formData.toData,
    projectId: formData.projects[0],
    gatewayId: formData.gateways[0],
  };

  try {
    const { data } = await axios.post(
      `${BASE_URL}/${ENDPOINTS.REPORT}`,
      payload
    );
    if (failedRequest(data)) throw data;

    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
