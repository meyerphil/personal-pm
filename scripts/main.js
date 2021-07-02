function toggleMenu() {
    var x = document.getElementById("menu");

    if(x.style.maxHeight === "0px"){
        x.style.maxHeight = "300px";
		document.getElementById("m").innerHTML = "&#10005;";
    }else{
        x.style.maxHeight = "0px";
        document.getElementById("m").innerHTML = "&#9776;";
    }

}