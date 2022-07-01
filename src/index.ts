import { createElement, createTextElement, render as _render } from './main'
import { useState as useStateHook } from './hooks/useState'
import { useEffect as useEffectHook } from './hooks/useEffect'
import { useMemo as useMemoHook } from './hooks/useMemo'
/* ... */
import { TUseStateHook } from './types/hooks.types'
import { TVDom } from './types/vdom.types'

const Sun = Object.create(null)

Sun.createElement = createElement as (type: string, props: { [key: string]: any }, ...children: any[]) => TVDom
Sun.createTextElement = createTextElement as (text: string) => TVDom
Sun.render = _render as (element: any, containe: HTMLElement) => void
Sun.useState = useStateHook as (initValue: any) => TUseStateHook
Sun.useEffect = useEffectHook as (callback: () => any, dependences: Array<any> | undefined) => void
Sun.useMemo = useMemoHook as (callback: () => any, dependences: Array<any> | undefined) => void

export const render: (element: any, containe: HTMLElement) => void = _render
export const useState: (initValue: any) => TUseStateHook = useStateHook
export const useEffect: (callback: () => any, dependences: Array<any> | undefined) => void = useEffectHook
export const useMemo: (callback: () => any, dependences: Array<any> | undefined) => void = useMemoHook

export default Sun
