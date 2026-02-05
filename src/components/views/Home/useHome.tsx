import { LIMIT_BANNER, PAGE_DEFAULT } from "@/constants/list.constants";
import bannerServices from "@/services/banner.service copy";
import { useQuery } from "@tanstack/react-query";
import { LIMIT_CATEGORY, LIMIT_EVENT } from "./Home.constants";
import eventServices from "@/services/event.service";
import categoryServices from "@/services/category.service";

const useHome = () => {
  const getBanners = async () => {
    const params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`;

    const res = await bannerServices.getBanners(params);
    const { data } = res;
    return data;
  };

  const { data: dataBanners, isLoading: isLoadingBanners } = useQuery({
    queryKey: ["Banners"],
    queryFn: getBanners,
  });

  const getCategories = async () => {
    const params = `limit=${LIMIT_CATEGORY}&page=${PAGE_DEFAULT}`;

    const res = await categoryServices.getCategories(params);
    const { data } = res;
    return data;
  };

  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["Categories"],
    queryFn: getCategories,
  });

  const getEvents = async (params: string) => {
    const res = await eventServices.getEvents(params);
    const { data } = res;
    return data;
  };

  const currentEventQuery = `limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}&isPublished=true`;

  const { data: dataFeaturedEvents, isLoading: isLoadingFeaturedEvents } =
    useQuery({
      queryKey: ["FeaturedEvents"],
      queryFn: () => getEvents(`${currentEventQuery}&isFeatured=true`),
    });

  const { data: dataLatestEvents, isLoading: isLoadingLatestEvents } = useQuery(
    {
      queryKey: ["LatestEvents"],
      queryFn: () => getEvents(`${currentEventQuery}`),
    },
  );
  return {
    dataBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    isLoadingBanners,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategories,
    isLoadingCategories,
  };
};

export default useHome;
