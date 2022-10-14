import { createElement, createTextElement, setSyncMode, render as _render, createRoot as _createRoot, memo as _memo } from './main'
import { useState as useStateHook } from './hooks/useState'
import { useEffect as useEffectHook } from './hooks/useEffect'
import { useMemo as useMemoHook } from './hooks/useMemo'
import { useCallback as useCallbackHook } from './hooks/useCallback'
import { useRef as useRefHook } from './hooks/useRef'
/* ... */
import { TUseStateHook } from './types/hooks.types'
import { TVDom } from './types/vdom.types'
import { RootFiberController } from './lib/rootFiberController.class'

const Sun = Object.create(null)

window.__SUN__ = Sun

Sun.createElement = createElement as (type: string, props: { [key: string]: any }, ...children: any[]) => TVDom
Sun.createTextElement = createTextElement as (text: string) => TVDom
Sun.setSyncMode = setSyncMode as () => void

Sun.render = _render as (element: TVDom, containe: HTMLElement) => void
Sun.createRoot = _createRoot as (container: HTMLElement) => RootFiberController
Sun.memo = _memo as (element: TVDom) => TVDom
Sun.useState = useStateHook as (initialValue: any) => TUseStateHook
Sun.useEffect = useEffectHook as (callback: () => any, dependences: Array<any> | undefined) => void
Sun.useMemo = useMemoHook as (callback: () => any, dependences: Array<any> | undefined) => any
Sun.useCallback = useCallbackHook as (callback: () => any, dependences: Array<any> | undefined) => any
Sun.useRef = useRefHook as (initialValue: any) => { current: any }

export const render: (element: TVDom, container: HTMLElement) => void = _render
export const createRoot: (container: HTMLElement) => RootFiberController = _createRoot
export const memo: (element: TVDom) => TVDom = _memo
export const useState: (initialValue: any) => TUseStateHook = useStateHook
export const useEffect: (callback: () => any, dependences: Array<any> | undefined) => void = useEffectHook
export const useMemo: (callback: () => any, dependences: Array<any> | undefined) => any = useMemoHook
export const useCallback: (callback: () => any, dependences: Array<any> | undefined) => any = useCallbackHook
export const useRef: (initialValue: any) => { current: any } = useRefHook

export default Sun
