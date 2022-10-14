export type TGlobalConfig = {
	requestIdleCallbackTimeout: number
	[key: string]: any
}
export const globalConfig: TGlobalConfig = {
	requestIdleCallbackTimeout: 100,
}

export type TRenderProfile = {
	async: boolean
}
export const renderProfile: TRenderProfile = {
	async: true,
}
