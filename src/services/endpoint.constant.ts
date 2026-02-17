import environment from "@/config/environment";

const endpoint = {
  AUTH: `${environment.API_URL}/auth`,
  BANNER: `${environment.API_URL}/banners`,
  CATEGORY: `${environment.API_URL}/category`,
  MEDIA: `${environment.API_URL}/media`,
  ORDER: `${environment.MIDTRANS_SNAP_URL}/order`,
  EVENT: `${environment.API_URL}/events`,
  REGION: `${environment.API_URL}/regions`,
  TICKET: `${environment.API_URL}/tickets`,
};

export default endpoint;
