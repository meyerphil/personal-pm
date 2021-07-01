function toggleMenu() {
    var x = document.getElementById("menu");

    if(x.style.maxHeight === "0px"){
        x.style.maxHeight = "300px";
		document.getElementById("mClose").style.display = "block";
		document.getElementById("mOpen").style.display = "none";
		document.getElementById("mOpen").innerHTML = "x";
    }else{
        x.style.maxHeight = "0px";
		document.getElementById("mOpen").style.display = "block";
		document.getElementById("mClose").style.display = "none";
    }

}