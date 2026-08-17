import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const slides = [
  "/assets/pic5_ll.jpg",
  "/assets/hp_img_6.jpg",
  "/assets/hp_img_2.jpg",
  "/assets/hp_img_3.jpg",
  "/assets/hp_img_4.jpg",
  "/assets/hp_img_5.jpg",
];

export default function Slider() {
  return (
    <div className="w-full overflow-hidden">

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
      >

        {slides.map((image, index) => (

          <SwiperSlide key={index}>

            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="
                block
                w-full
                h-[220px]
                sm:h-[300px]
                md:h-[400px]
                lg:h-[500px]
                object-cover
              "
            />

          </SwiperSlide>

        ))}

      </Swiper>

    </div>
  );
}