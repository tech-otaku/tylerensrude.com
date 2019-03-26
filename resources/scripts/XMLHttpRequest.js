// JavaScript Document

function XMLLoad(url) {
	
	DisableLinks(true)	// Note: Links are re-enabled in ShowImage()
	
	//var newImage;
	
	XMLDocument = loadXMLDoc(url);
	XMLRoot=XMLDocument.documentElement;
	gXMLAlbumName = XMLRoot.getAttribute('album');
	XMLPath = XMLRoot.getAttribute('path');
	XMLFileName = XMLDocument.documentElement.getElementsByTagName('filename');
	XMLImageWidth = XMLDocument.documentElement.getElementsByTagName('width');
	XMLImageHeight = XMLDocument.documentElement.getElementsByTagName('height');
	
	gImages.splice(0, gImages.length);
	
	for (i=0;i<XMLFileName.length;i++) {
		gImages[i] = [];													
		gImages[i][0] = XMLPath + XMLFileName[i].firstChild.nodeValue;
		gImages[i][1] = XMLImageWidth[i].firstChild.nodeValue;
		gImages[i][2] = XMLImageHeight[i].firstChild.nodeValue;
		
		//MM_preloadImages(gImages[i][0]);
		
		/*
		// Pre-load Image
		gNewImage = new Image();
		gNewImage.src = gImages[i][0];
		*/
		
		gImages[i][3] = PositionX(gImages[i][1])				// Left
		gImages[i][4] = PositionY(gImages[i][2])				// Top
		
	}
	
	PreLoader();
	
	gPhotoCount = gImages.length;										
	gCurrentPhoto = 1;		
	gCounter = 0;
	
	SetPosition(gImages[0][3], gImages[0][4], gImageA);
	//gA.src = gImages[0][0];
	gA.setAttribute('src', gImages[0][0]);
	setTimeout("ShowImage()", 2000);
	//alert(gNewImage.src);

}




// load an XML document
function loadXMLDoc(url) {
	xmlhttp=null
	// code for Mozilla, etc.
	if (window.XMLHttpRequest) {
		xmlhttp=new XMLHttpRequest()
	}
	// code for IE
	else if (window.ActiveXObject) {
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP")
	}
	
	if (xmlhttp!=null) {
		xmlhttp.onreadystatechange=state_Change
		xmlhttp.open("GET",url,false)
		xmlhttp.send(null)
		//gXMLDocument = xmlhttp.responseXML
		return xmlhttp.responseXML
	} else {
		alert("Your browser does not support XMLHTTP.")
	}
}


function state_Change() {
	// if xmlhttp shows "loaded"
	if (xmlhttp.readyState==4) {
	// if "OK"
	if (xmlhttp.status==200) {
		} else {
			alert("Problem retrieving XML data:" + xmlhttp.statusText)
		}
	}
}


function PreLoader() {
	for (i=0;i<gImages.length;i++) {
		MM_preloadImages(gImages[i][0]);
	}
}