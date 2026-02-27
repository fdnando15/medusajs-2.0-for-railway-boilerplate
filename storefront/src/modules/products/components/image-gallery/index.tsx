"use client"

import { HttpTypes } from "@medusajs/types"
import { useState } from "react"
import MainCarousel from "./main-carousel"
import ThumbnailCarousel from "./thumbnail-carousel"
import DotsIndicator from "./dots-indicator"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="w-full">
      {/* Carrusel principal */}
      <MainCarousel 
        images={images}
        selectedIndex={selectedIndex}
        onSelect={setSelectedIndex}
      />
      
      {/* Dots indicadores - solo móvil */}
      {images.length > 1 && (
        <div className="block small:hidden">
          <DotsIndicator
            count={images.length}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
        </div>
      )}
      
      {/* Thumbnails - solo desktop */}
      {images.length > 1 && (
        <div className="hidden small:block mt-4">
          <ThumbnailCarousel
            images={images}
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
          />
        </div>
      )}
    </div>
  )
}

export default ImageGallery
