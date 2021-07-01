function toggleMenu() {
    var x = document.getElementById("menu");
	if(x.style.maxHeight === "0px"){
        x.style.maxHeight = "300px";
    }else{
        x.style.maxHeight = "0px";
    }
}