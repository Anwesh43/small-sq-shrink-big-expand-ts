import {
    useState, 
    useEffect,
    CSSProperties
} from 'react'

export const useAnimatedScale = (scGap : number = 0.01, delay : number = 20) => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
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

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    }, [])
    return {
        w,
        h
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)

const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 

const sinify : (a : number) => number = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const size : number = Math.min(w, h) / 10 
    const sf : number = sinify(scale)
    const dsc : (i : number) => number = (i : number) => divideScale(sf, i, 2)
    const position = 'absolute'
    return {
        parentStyle() : CSSProperties {
            
            const left : string = `${w / 2}px`
            const top : string = `${h / 2}px`
            return {
                left, 
                top, 
                position 
            }
        },

        smallSqStyle() : CSSProperties {
            return {
                position,
                left: `${-size / 2}px`,
                top: `${h / 2}px`,
                width: `${size}px`,
                height: `${size * (1 - dsc(0))}px`,
                background: 'indigo'
            }
        },
        bigSqStyle() : CSSProperties {
            return {
                position, 
                top: `${-size * dsc(1)}px`,
                left: `${-w / 2}px`,
                width: `${size * dsc(1)}px`,
                height: `${h * 0.5 * dsc(1)}px`,
                background: 'indigo'
            }
        }
    }
}

export type StyleProps = ReturnType<typeof useStyle>
