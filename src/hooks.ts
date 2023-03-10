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
                        if (prev > 1) {
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

export const useStyle = (w : number, h : number, scale : number, background : string = 'indigo', parts : number = 3) => {
    const size : number = Math.min(w, h) / 10 
    const sf : number = sinify(scale)
    const dsc : (i : number) => number = (i : number) => divideScale(sf, i, parts)
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
                top: `${0}px`,
                width: `${size}px`,
                height: `${size * (1 - dsc(0))}px`,
                background
            }
        },
        bigSqStyle() : CSSProperties {
            return {
                position, 
                top: `${-h * 0.5 * dsc(2)}px`,
                left: `${-w / 2}px`,
                width: `${w}px`,
                height: `${h * 0.5 * dsc(2)}px`,
                background
            }
        },
        lineStyle() : CSSProperties {
            const left : string = `${-w * 0.5 * dsc(1)}px`
            const top : string = `0px`
            const height : string = `${Math.min(w, h) / 90}px`
            const width : string = `${w * dsc(1)}px`
            return {
                position, 
                left, 
                top, 
                height, 
                width,
                background 
            }
        }
    }
}

export type StyleProps = ReturnType<typeof useStyle>
