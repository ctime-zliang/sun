export type TGlobalConfig = {
	requestIdleCallbackTimeout: number
	[key: string]: any
}

export const globalConfig: TGlobalConfig = {
	requestIdleCallbackTimeout: 1000,
}
