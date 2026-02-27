"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import ChevronLeft from "@modules/common/icons/chevron-left"
import ChevronRight from "@modules/common/icons/chevron-right"
import styles from "./embla.module.css"

type MainCarouselProps = {
  images: HttpTypes.StoreProductImage[]
  selectedIndex: number
  onSelect: (index: number) => void
}

const MainCarousel = ({ images, selectedIndex, onSelect }: MainCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    duration: 20
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelectCallback = useCallback(() => {
    if (!emblaApi) return
    onSelect(emblaApi.selectedScrollSnap())
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi) return
    onSelectCallback()
    emblaApi.on("select", onSelectCallback)
    return () => {
      emblaApi.off("select", onSelectCallback)
    }
  }, [emblaApi, onSelectCallback])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.scrollTo(selectedIndex)
  }, [emblaApi, selectedIndex])

  const canScrollPrev = emblaApi?.canScrollPrev() ?? false
  const canScrollNext = emblaApi?.canScrollNext() ?? false

  return (
    <div className="relative">
      {/* Botón anterior - solo desktop */}
      <button
        className={`${styles.embla__button} hidden small:flex absolute left-4 top-1/2 -translate-y-1/2 z-10`}
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        aria-label="Previous image"
      >
        <ChevronLeft size="20" />
      </button>

      {/* Carrusel */}
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          {images.map((image, index) => (
            <div key={image.id} className={styles.embla__slide}>
              <Container className="relative aspect-[1/1] w-full small:max-w-[450px] small:mx-auto overflow-hidden bg-ui-bg-subtle">
                {!!image.url && (
                  <Image
                    src={image.url}
                    priority={index === 0}
                    className="absolute inset-0 rounded-rounded"
                    alt={`Product image ${index + 1}`}
                    fill
                    sizes="(max-width: 576px) 100vw, (max-width: 768px) 50vw, 450px"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                )}
              </Container>
            </div>
          ))}
        </div>
      </div>

      {/* Botón siguiente - solo desktop */}
      <button
        className={`${styles.embla__button} hidden small:flex absolute right-4 top-1/2 -translate-y-1/2 z-10`}
        onClick={scrollNext}
        disabled={!canScrollNext}
        aria-label="Next image"
      >
        <ChevronRight size="20" />
      </button>
    </div>
  )
}

export default MainCarousel
