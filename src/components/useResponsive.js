import { useState,useEffect } from 'react';

export default function useResponsive() {
    const [width, setWindowWidth] = useState(0)
    useEffect(() => {

        updateDimensions();

        window.addEventListener("resize", updateDimensions);
        return () =>
            window.removeEventListener("resize", updateDimensions);
    }, [])
    const updateDimensions = () => {
        const width = window.innerWidth
        setWindowWidth(width)
    }

  return width
}