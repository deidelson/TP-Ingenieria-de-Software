function bootstrap() {
  var myObj;
  
 
   var stringg; 
  
  var getString = function(url) {
    var xmlhttp = new XMLHttpRequest();
    var res = null;
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        
        res = xmlhttp.responseText;
        xml2 = this.responseData;
       
 
        return res;
        
      }
    };
    xmlhttp.open("GET", url, false);
    xmlhttp.send();
  }
  
 

  var convertoObject = function(string) {
    var ret= JSON.parse(string);
    return ret;
  }

    


}

$(bootstrap);