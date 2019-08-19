module.exports =function () {

    var number = 0;

    
    var defaultTitle = "Portfolio de Jimmy Billan";
    
    var title = defaultTitle;
    var titleDefault = true;
    
    function getTitleDefault(){
        return titleDefault;
    }

    /**
     * Afficher ou non le titre par default
     * @param {bool} b 
     */
    function setDefautTitre(b){
        titleDefault = b;
        title = defaultTitle;
    }
    
    var back = false;
    function getNumber() {
        return number;
    }
    function setNumber(newNumber) {
        number = newNumber;
    }

    function getTitle() {
        return title;
    }
    function setTitle(newtitle) {
        titleDefault = false;
        title = newtitle;
    }

    function getBack() {
        return back;
    }
    function setBack(newBack) {
        back = newBack;
    }
    return {
        getNumber: getNumber,
        setNumber: setNumber,
        getTitle: getTitle,
        setTitle: setTitle,
        getBack : getBack,
        setBack : setBack,
        getTitleDefault : getTitleDefault,
        setDefautTitre : setDefautTitre
    }
}