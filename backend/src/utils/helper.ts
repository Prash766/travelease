export const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {}; 
  
    if (queryParams.destination) {
      constructedQuery.$or = [
        { city: new RegExp(queryParams.destination, "i") },
        { country: new RegExp(queryParams.destination, "i") },
      ];
    }
    if (queryParams.adultCount) {
      constructedQuery.adultCount = {
        $gte: parseInt(queryParams.adultCount),
      };
    }
    if (queryParams.childCount) {
      constructedQuery.childCount = {
        $gte: parseInt(queryParams.childCount),
      };
    }
    if (queryParams.facilites) {
      constructedQuery.facilites = {
        $all: Array.isArray(queryParams.facilites) ? queryParams.facilites : [queryParams.facilites],
      };
    }
    if (queryParams.types) {
      constructedQuery.type = {
        $in: Array.isArray(queryParams.types) ? queryParams.types : [queryParams.types],
      };
    }
    if (queryParams.stars) {
      const starRating = Array.isArray(queryParams.stars)
        ? queryParams.stars.map((star: string) => parseInt(star))
        : parseInt(queryParams.stars);
      constructedQuery.starRating = {
        $eq: starRating,
      };
    }
    if (queryParams.maxPrice) {
      constructedQuery.pricePerNight = {
        $lte: parseInt(queryParams.maxPrice),
      };
    }
    if(queryParams.minPrice){
        constructedQuery.pricePerNight={
            $gte: parseInt(queryParams.minPrice)

        }
    }
    if (queryParams.facilities) {
        constructedQuery.facilities = { $all: queryParams.facilities };
    }
    if (queryParams.types) {
        constructedQuery.type = { $in: queryParams.types };
    }
    if (queryParams.minPrice || queryParams.maxPrice) {
        constructedQuery.pricePerNight = {
            ...(queryParams.minPrice && { $gte: parseInt(queryParams.minPrice) }),
            ...(queryParams.maxPrice && { $lte: parseInt(queryParams.maxPrice) })
        };
    }
    
    
  
    return constructedQuery;
  };
  