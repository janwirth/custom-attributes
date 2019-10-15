webAttribute('scale-to-fit', ([attrValue, el]) => {
    if (attrValue !== null) {
        // get the target size from the attribute
        const targetSize = Number(attrValue)

        const dimensions = el.initialSize || el.getBoundingClientRect()

        el.initialSize = dimensions
        const biggerSide = Math.max(dimensions.width, dimensions.height)
        const scaleFactor = targetSize / biggerSide
        el.style.transform = `scale(${scaleFactor})`
    } else {
        el.style.transform = null
    }
})
