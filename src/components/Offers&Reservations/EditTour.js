// import React from "react";
// import { set_edit } from "./TourSlice";
// import { useDispatch } from "react-redux";

const RoomsType = {
  index: 0,
  room_category_id: 0,
  room_price: 0,
  extrabed: 0,
  extrabed_price: 0,
};

const tourD = {
  index: 0,
  date: " ",
  city_id: 0,
  title: "",
  tour_id: 0,
  accommodation_type_id: null,
  accommodation_type_name: "",
  tourguide: 0,
  tourguide_price: 0,
  accommodation_id: null,
  accommodation_price: 0,
  number_of_rooms: 0,
  roomsCategories: [],
};

const data = {
  operator_id: 1,
  country_id: 0,
  website_share: false,
  tour_name: "",
  tour_title: "",
  tour_header_name: "",
  transportation_id: 0,
  transportation_name: "",
  transportation_Type_price: 0,
  from: "",
  till: "",
  number_of_days: 0,
  tourDetails: [],
  tourguide_price: 0,
  transportation_price: 0,
  hotels_price: 0,
  profit_price: 0,
  total_price: 0,
};
export default function EditTour(savedData, selectedItem) {
  console.log(savedData);

  // Extract tour guide price safely
  const TourguidePrice = selectedItem?.tourguide_prices?.[0]?.price ?? 0;

  // Populate data object with saved data
  const data = {
    operator_id: savedData?.operator_id ?? 0,
    country_id: savedData?.country_id ?? 0,
    website_share: savedData?.website_share ?? false,
    tour_name: savedData?.tour_title ?? "",
    tour_title: savedData?.tour_header?.id ?? "",
    tour_header_name: savedData?.tour_header?.title_EN ?? "",
    transportation_id: savedData?.transportation_id ?? 0,
    transportation_name: savedData?.transportation?.type ?? "",
    number_of_days: savedData?.number_of_days ?? 0,
    transportation_price: savedData?.transportation_price ?? 0,
    transportation_Type_price:
      (savedData?.transportation_price ?? 0) / (savedData?.number_of_days ?? 1),
    from: savedData?.from ?? "",
    till: savedData?.till ?? "",
    tourguide_price: savedData?.tour_guide_price ?? 0,
    hotels_price: savedData?.hotels_price ?? 0,
    profit_price: savedData?.profit_price ?? 0,
    total_price: savedData?.tour_price ?? 0,
    tourDetails:
      savedData?.tour_details?.map((tourDetail, index) => {
        return {
          index: index + 1,
          date: tourDetail?.date ?? "",
          city_id: tourDetail?.tour?.city_id ?? 0,
          city_name: tourDetail?.tour?.city?.city,
          tour_id: tourDetail?.tour_id ?? 0,
          tour_name: tourDetail?.tour?.tour_title_EN,
          accommodation_type_id:
            tourDetail?.accommodation?.accommodation_type_id ?? null,
          accommodation_type_name:
            tourDetail?.accommodation?.accommodation_type?.accommodation_type ??
            "",
          tourguide: !!tourDetail?.tourguide,
          tourguide_price: !!tourDetail?.tourguide ? TourguidePrice : 0,
          accommodation_id: tourDetail?.accommodation_id ?? null,
          accommodation_name: tourDetail?.accommodation?.name,
          accommodation_price: parseFloat(tourDetail?.accommodation_price ?? 0),
          number_of_rooms: tourDetail?.number_of_room ?? 0,
          roomsCategories:
            tourDetail?.r_room_categories?.map((item, indexx) => {
              return {
                index: indexx,
                room_category_id: item?.room_category_id ?? 0,
                room_category_name:
                  item?.room_category?.room_category?.room_category,
                room_price: parseFloat(item?.room_price ?? 0),
                extrabed: !!item?.extra_bed,
                extrabed_price: parseFloat(item?.extrabed_price ?? 0),
              };
            }) ?? [],
        };
      }) ?? [],
  };

  return data;
}
