import { createElement, createTextElement, render as _render } from './main'
import { useState as useStateHook } from './hooks/useState'
import { TUseStateHook } from './types/hooks.types'
import { TVdom } from './types/vdom.types'

const Sun = Object.create(null)

Sun.createElement = createElement as (type: string, props: { [key: string]: any }, ...children: any[]) => TVdom
Sun.createTextElement = createTextElement as (text: string) => TVdom
Sun.render = _render as (element: any, containe: HTMLElement) => void
Sun.useState = useStateHook as (initValue: any) => TUseStateHook

export const render: (element: any, containe: HTMLElement) => void = _render
export const useState: (initValue: any) => TUseStateHook = useStateHook

export default Sun
