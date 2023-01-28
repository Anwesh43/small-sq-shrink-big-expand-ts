import React from 'react'
import {
    useDimension, 
    useAnimatedScale
} from './hooks'
const withContext = (MainComponent : React.FC<any>)  : React.FC<any> => {
    return (props : any) => {
        const {w, h} = useDimension()
        const {scale, start : onClick} = useAnimatedScale(0.02 / props.parts)

        const newProps : any = {
            ...props, 
            w, 
            h, 
            scale, 
            onClick
        }
        return (
            <MainComponent {...newProps}>

            </MainComponent>
        )
    }
}

export default withContext 