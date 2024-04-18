import Slider from "react-slick";
export function Staticcarousel({ photos }) {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    //  rtl:true,
    responsive: [
      {
        breakpoint: 1920, // Adjusted breakpoint for xxl screens
        settings: {
          slidesToShow: 6, // Show 3 slides for xxl screens
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings}>
        {photos.map((items, index) => (
          <div key={index} className="item">
            <img
              alt="img"
              className="d-block w-100"
              src={
                process.env.REACT_APP_API_BASE_URL +
                "/TourImages/" +
                items.photo
              }
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
