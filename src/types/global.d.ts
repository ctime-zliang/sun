interface Window {
	__RTP__: any
	__RTCP__: any
}

declare var window: Window & typeof globalThis
