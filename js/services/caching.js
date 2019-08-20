module.exports = function () {

    var NB_MAX_PROJET_EN_CACHE = 3;


    function getMenuFooter(){
        try{
            var t = JSON.parse(localStorage.getItem('menuFooter'));
            var mF = t.data;
        }catch(error){
            var mF = null;
        }
        return mF;
    }

    function setMenuFooter(content){
        localStorage.setItem('menuFooter', JSON.stringify(content));
    }      


    function getshortListProjet(){
        try{
            var mF = JSON.parse(localStorage.getItem('shortListProjet'));
        }catch(error){
            var mF = null;
        }
        return mF;
    }

    function setshortListProjet(content){
        localStorage.setItem('shortListProjet',  JSON.stringify(content));
    }

    function getlongListProjet(){
        try{
            var mF = JSON.parse(localStorage.getItem('longListProjet'));
        }catch(error){
            var mF = null;
        }
        return mF;
    }

    function setlongListProjet(content){
        localStorage.setItem('longListProjet',  JSON.stringify(content));
    }



    return {
      
        getMenuFooter : getMenuFooter,
        setMenuFooter : setMenuFooter,
        getshortListProjet : getshortListProjet,
        setshortListProjet : setshortListProjet,
        getlongListProjet : getlongListProjet,
        setlongListProjet : setlongListProjet

    };
}