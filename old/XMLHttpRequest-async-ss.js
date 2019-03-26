// JavaScript Document

function XMLLoad(url) {
	
	DisableLinks(true)	// Note: Links are re-enabled in ShowImage()
	
	var newImage;
	
	XMLDocument = loadXMLDoc(url);
	XMLRoot=XMLDocument.documentElement;
	gXMLAlbumName = XMLRoot.getAttribute('album');
	XMLPath = XMLRoot.getAttribute('path');
	XMLFileName = XMLDocument.documentElement.getElementsByTagName('filename');
	XMLImageWidth = XMLDocument.documentElement.getElementsByTagName('width');
	XMLImageHeight = XMLDocument.documentElement.getElementsByTagName('height');
	
	gImages.splice(0, gImages.length);
	
	for (i=0;i<XMLFileName.length;i++) {
		gImages[i] = [];													// gImages is declared globally in photoworks.html
		gImages[i][0] = XMLPath + XMLFileName[i].firstChild.nodeValue;
		gImages[i][1] = XMLImageWidth[i].firstChild.nodeValue;
		gImages[i][2] = XMLImageHeight[i].firstChild.nodeValue;
		
		// Pre-load Image
		newImage = new Image();
		newImage.src = gImages[i][0];
		//alert(newImage.src);
		
		//gImages[i][3] = PositionX(gImages[i][1])				// Left
		//gImages[i][4] = PositionY(gImages[i][2])				// Top
		
		//alert(gImages[i][3]);
		
		
	}
	
		gPhotoCount = gImages.length;										// gPhotoCount is declared globally in photoworks.html
		gCurrentPhoto = 1;
				
		gImageACounter = 0;
		gImageBCounter = 1;
		gCounter = 0;
		
		Position(gImages[0][1], gImages[0][2], gImageA);
		//SetPosition(gImages[0][3], gImages[0][4], gImageA);
		gA.src = gImages[0][0];
		setTimeout("ShowImage()", 2000);
		
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
	//alert(url)
	// if xmlhttp shows "loaded"
	if (xmlhttp.readyState==4) {
	// if "OK"
	if (xmlhttp.status==200) {
		//alert("XML data OK")
		//preLoadImages();
		} else {
			alert("Problem retrieving XML data:" + xmlhttp.statusText)
		}
	}
}