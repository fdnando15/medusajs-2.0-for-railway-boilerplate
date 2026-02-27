"use client"

type DotsIndicatorProps = {
  count: number
  selectedIndex: number
  onSelect: (index: number) => void
}

const DotsIndicator = ({ count, selectedIndex, onSelect }: DotsIndicatorProps) => {
  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onSelect(index)}
          className={`w-2 h-2 rounded-full transition-all ${
            index === selectedIndex 
              ? "bg-black w-6" 
              : "bg-gray-300 hover:bg-gray-400"
          }`}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === selectedIndex}
        />
      ))}
    </div>
  )
}

export default DotsIndicator
