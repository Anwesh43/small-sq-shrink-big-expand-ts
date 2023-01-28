import {
    useState, 
    useEffect
} from 'react'

export const useAnimatedScale = (scGap : number = 0.01, delay : number = 20) => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        animated, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (scale > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}