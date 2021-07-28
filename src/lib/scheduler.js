let nextWorkUnit = null

export function workLoop(deadline) {
    let shouldYield = false
    while (nextWorkUnit && !shouldYield) {
        nextWorkUnit = performUnitWork(nextWorkUnit)
        shouldYield = deadline.timeRemaining() < 1
    }

    window.requestIdleCallback(workLoop)
}

export function performUnitWork(nextWorkUnit) {

}