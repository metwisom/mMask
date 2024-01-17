const region = (function () {
    const list = {}
    const mask = {}

    const functions = {
        get mask() {
            return mask
        }, detect: function (str) {
            return Object.entries(list).reduce((prev, cur) => {
                const [region, code] = cur;
                return (`+${str}`.includes(`+${code}`)) ? region : prev;
            }, "undef");
        }, add: function (region, code, map) {
            if (list.hasOwnProperty(region)) {
                console.error(`Region '${region}' already exists. Please choose a unique region.`);
                return;
            }
            list[region] = code
            mask[region] = map
        },
    }
    functions.add("undef", -1, "_____________")
    functions.add("RU", 7, "+_ (___) ___-__-__")
    functions.add("BY", 375, "+___ (__) ___-__-__")
    functions.add("UA", 380, "+___ (__) ___-__-__")
    functions.add("LT", 370, "+___ (___) _____")
    functions.add("LV", 371, "+___ ________")

    return Object.freeze(functions)

})()

export {region}