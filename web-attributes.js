const mutationCallback = attribute => callback => mutationList => {
    mutationList.forEach(function(mutation) {
        if (mutation.type == "attributes" && mutation.attributeName == attribute) {
            callback(mutation);
        }
    });
};

function webAttribute(name, callback) {

    // how to return the information
    const cb = el => callback([el.getAttribute(name), el])

    // find inital matches
    const query = `[${name}]`
    const matches = Array.from(document.querySelectorAll(query))
    matches.forEach(x => cb(x))

    // watch for further matches
    var observer = new MutationObserver(mutationCallback(name)(mutationEntry => {
        cb(mutationEntry.target);
    }));

    observer.observe(document, {
        attributeFilter: [name],
        attributeOldValue: false,
        subtree: true
    });

    return () => observer.disconnect()
}
