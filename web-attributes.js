const mutationCallback = attribute => callback => mutationList => {
    mutationList.forEach(function(mutation) {
        if (
            mutation.type == "attributes" &&
            mutation.attributeName == attribute
        ) {
            callback(mutation);
        }
    });
};

const withEachHit = query => cb => {
    const matches = Array.from(document.querySelectorAll(query));
    matches.forEach(x => cb(x));
};

export function register(name, callback) {
    // how to return the information
    const cb = el => callback([el.getAttribute(name), el]);

    // find inital matches
    const query = `[${name}]`;
    withEachHit(query)(cb);

    // watch for further matches
    var observer = new MutationObserver(
        mutationCallback(name)(mutationEntry => {
            cb(mutationEntry.target);
        })
    );

    observer.observe(document, {
        attributeFilter: [name],
        attributeOldValue: false,
        subtree: true
    });
    watchParentConnections(query, cb);

    return () => observer.disconnect();
}

function watchParentConnections(query, cb) {
    var mutationObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            withEachHit(query)(cb);
        });
    });

    mutationObserver.observe(document.documentElement, {
        attributes: false,
        characterData: false,
        childList: true,
        subtree: true
    });
}
