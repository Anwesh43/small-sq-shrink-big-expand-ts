import React from 'react'
import withContext from './withContext'
import {StyleProps, useStyle} from './hooks'

interface SSAEProps {
    w : number, 
    h : number, 
    scale : number, 
    onClick : () => void, 
    color? : string, 
    parts? : number
}

const SqShrinkAndExpand : React.FC<SSAEProps> = (props : SSAEProps) => {
    const styleObj : StyleProps = useStyle(props.w, props.h, props.scale, props.color, props.parts)
    return (
        <div style = {styleObj.parentStyle()}>
            <div style = {styleObj.smallSqStyle()} onClick = {() => props.onClick()}></div>
            <div style = {styleObj.lineStyle()} onClick = {() => props.onClick()}></div>
            <div style = {styleObj.bigSqStyle()}></div>
        </div>
    )
}

export default withContext(SqShrinkAndExpand)