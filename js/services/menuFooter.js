module.exports =function () {

    // false down, true up
    var state = false;
    function getState() {
        return state;
    }
    function setState(s) {
        state = s;
    }

    return {
        getState: getState,
        setState: setState
    }
}