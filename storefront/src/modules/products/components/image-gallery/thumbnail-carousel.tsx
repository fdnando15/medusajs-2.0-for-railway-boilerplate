"use client"

import { HttpTypes } from "@medusajs/types"
import Image from "next/image"
import { useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import styles from "./embla.module.css"

type ThumbnailCarouselProps = {
  images: HttpTypes.StoreProductImage[]
  selectedIndex: number
  onSelect: (index: number) => void
}

const ThumbnailCarousel = ({ images, selectedIndex, onSelect }: ThumbnailCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaApi) return
      onSelect(index)
    },
    [emblaApi, onSelect]
  )

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.scrollTo(selectedIndex)
  }, [emblaApi, selectedIndex])

  return (
    <div className={styles.embla__thumbs}>
      <div className={styles.embla__thumbs} ref={emblaRef}>
        <div className={styles.embla__thumbs__container}>
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => onThumbClick(index)}
              className={`${styles.embla__thumbs__slide} ${
                index === selectedIndex ? styles["embla__thumbs__slide--selected"] : ""
              }`}
              type="button"
              aria-label={`Go to image ${index + 1}`}
            >
              <div className="relative w-20 h-20">
                {!!image.url && (
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="80px"
                    className="rounded-lg"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ThumbnailCarousel
