import environment from "@/config/environment";

const endpoint = {
  AUTH: `${environment.API_URL}/auth`,
  CATEGORY: `${environment.API_URL}/category`,
  MEDIA: `${environment.API_URL}/media`,
};

export default endpoint;
