export type TGlobalConfig = {
	requestIdleCallbackTimeout: number
	[key: string]: any
}

export const globalConfig: TGlobalConfig = {
	requestIdleCallbackTimeout: 1000,
}

export type TRenderProfile = {
	async: boolean
}

export const renderProfile: TRenderProfile = {
	async: true,
}
