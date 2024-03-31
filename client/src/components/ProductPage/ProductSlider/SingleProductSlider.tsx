import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { CarouselThumbsButton } from "./CarouselThumbsButton";
import Image from "next/image";
import { fileUrlKey } from "@/utils/envConfig";

type PropType = {
  slides: any[];
  options?: EmblaOptionsType;
  // selectColorName: string | null;
};

const SingleProductSlider: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );
  // Function to handle clicking on a variant
  const handleVariantClick = (variantColor: string) => {
    const variantIndex = slides.findIndex(
      (slide) => slide.color === variantColor
    );
    if (variantIndex !== -1) {
      onThumbClick(variantIndex);
    }
  };
  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);
  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaMainRef}>
        <div className="embla__container">
          {slides?.map((slide) => (
            <div className="embla__slide" key={slide.id}>
              <div className="embla__slide__number">
                <Image
                  src={`${fileUrlKey()}/${slide?.src}`}
                  alt="Product Image"
                  className="object-cover"
                  width={300}
                  height={300}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla-thumbs">
        <div className="embla-thumbs__viewport" ref={emblaThumbsRef}>
          <div className="embla-thumbs__container">
            {slides?.map((slide, index) => (
              <CarouselThumbsButton
                key={slide.id}
                onClick={() => onThumbClick(index)}
                // onClick={() => handleVariantClick(slide.color)}
                selected={index === selectedIndex}
                slide={slide}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductSlider;
