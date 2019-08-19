module.exports = function () {

    var NB_MAX_PROJET_EN_CACHE = 3;


    function getMenuFooter(){
        try{
            var mF = JSON.parse(localStorage.getItem('menuFooter'));
        }catch(error){
            var mF = null;
        }
        return mF;
    }

    function setMenuFooter(content){
        localStorage.setItem('menuFooter', JSON.stringify(content));
    }  

    function getPageAccueil(){
        try{
            var mF = localStorage.getItem('pageAccueil');
        }catch(error){
            var mF = null;
        }
        return mF;
    }

    function setPageAccueil(content){
        localStorage.setItem('pageAccueil', content);
    }



    return {
      
        getMenuFooter : getMenuFooter,
        setMenuFooter : setMenuFooter,
        getPageAccueil : getPageAccueil,
        setPageAccueil : setPageAccueil

    };
}