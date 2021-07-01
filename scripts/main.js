function toggleMenu() {
    var x = document.getElementById("menu");

    if(x.style.maxHeight === "0px"){
        x.style.maxHeight = "300px";
	document.getElementById("mb").innerHTML = "OPEN";
    }else{
        x.style.maxHeight = "0px";
	document.getElementById("mb").innerHTML = "CLOSE";
    }

}