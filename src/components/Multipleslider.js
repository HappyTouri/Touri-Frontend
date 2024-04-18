import Slider from "react-slick";
import { Link } from "react-router-dom";
function SampleNextArrow2(props) {
  // Remove { props } here
  const { className, style, onClick } = props; // Destructure props directly
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        height: "20px",
        fontSize: "1.3rem",
        borderRadius: "50%",
        width: "3rem",
        textAlign: "center",
        background: "rgb(255 255 255)",
        border: "1px solid #e8ebf3 !important",
        zIndex: "99",
        boxShadow: "0 4px 15px rgb(67 67 67 / 15%)",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow2(props) {
  // Remove { props } here
  const { className, style, onClick } = props; // Destructure props directly
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "rgb(255 255 255)",
        height: "20px",
        fontSize: "1.3rem",
        borderRadius: "50%",
        width: "3rem",
        textAlign: "center",
        border: "1px solid #e8ebf3 !important",
        zIndex: "99",
        boxShadow: "0 4px 15px rgb(67 67 67 / 15%)",
      }}
      onClick={onClick}
    />
  );
}

export function Multipleslider({ images }) {
  console.log(images);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    // rtl: true,

    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <SampleNextArrow2 />,
    prevArrow: <SamplePrevArrow2 />,
    responsive: [
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
        {images.map((item, index) => (
          <div key={index} className="item pe-3">
            <Link to="#" target="_blank">
              <img
                src={
                  process.env.REACT_APP_API_BASE_URL +
                  "/HotelPhotos/" +
                  item.photo
                }
                alt={"media" + index} // Adding index to avoid alt text repetition
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
