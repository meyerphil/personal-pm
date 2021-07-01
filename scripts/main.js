function toggleMenu() {
    var x = document.getElementById("menu");

    if(x.style.maxHeight === "0px"){
        x.style.maxHeight = "300px";
		document.getElementById("m").innerHTML = "x";
    }else{
        x.style.maxHeight = "0px";
    }

}