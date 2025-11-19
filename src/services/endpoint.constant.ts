import environment from "@/config/environment";

const endpoint = {
  AUTH: `${environment.API_URL}/auth`,
  CATEGORY: `${environment.API_URL}/category`,
  MEDIA: `${environment.API_URL}/media`,
  EVENT: `${environment.API_URL}/events`,
  REGION: `${environment.API_URL}/regions`,
};

export default endpoint;
