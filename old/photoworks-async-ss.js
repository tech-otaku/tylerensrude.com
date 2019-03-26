// JavaScript Document

// This includes the simplified Asynchronous version of SwapImages().

var gImageACounter;
var gImageBCounter;
var gImages;
var gPhotoCount;
var gXMLAlbumName;
var gCurrentPhoto;
var gImageA;
var gImageB;
var gA;
var gB;
var gLoader;
var gPrevious;
var gNext;
var gPlay;
var gFaderDuration;
var gBorderWidth;
var gHorizontalBorderWidth;
var gVerticalBorderWidth;
var gCurrentImage;
var gSlideShowInterval;
var gSlideShowRunning;
var gSlideShowTimer;
var gMenu;
var gCurrentEffect;

var gCounter;



function Initialise () {
	gImageACounter = 0;
	gImageBCounter = 1;
	gImages = new Array ();
	
	gCounter = 0;
	
	gImageA = document.getElementById('imageA');
	gImageB = document.getElementById('imageB');
	gA = document.getElementById('A');
	gB = document.getElementById('B');
	gLoader = document.getElementById('loader');
	gPrevious = document.getElementById('previous');
	gNext = document.getElementById('next');
	gPlay = document.getElementById('play');
	gFaderDuration = 1.5;
	gBorderWidth = $(gImageA).getStyle('border-top-width');
	//alert(gBorderWidth);
	gHorizontalBorderWidth = parseInt(parseFloat($(gImageA).getStyle('border-top-width'))) + parseInt(parseFloat($(gImageA).getStyle('border-bottom-width')));
	gVerticalBorderWidth = parseInt(parseFloat($(gImageA).getStyle('border-left-width'))) + parseInt(parseFloat($(gImageA).getStyle('border-right-width')));
	gSlideShowInterval = 5000;
	gSlideShowRunning = false;
	gCurrentImage = 'A';
	
	Event.observe('esther', 'click', FadeImages);
	Event.observe('bent', 'click', FadeImages);
	Event.observe('shoe', 'click', FadeImages);
	Event.observe('boy-in-a-bubble', 'click', FadeImages);
	Event.observe('twenty-nine', 'click', FadeImages);
	Event.observe('freelance-random', 'click', FadeImages);
	Event.observe(gPrevious, 'click', SwapImages);
	Event.observe(gNext, 'click', SwapImages);
	Event.observe(gPlay, 'click', ManageSlideShow);	
	
	gA.src = 'resources/images/photo_works/estherweb/esther4.png';	
	Position('361','504', gImageA);
	//SetPosition( PositionX('361'),PositionY('504'), gImageA );
	$(gImageA).setStyle({opacity: 0.9});

	gMenu = new Spry.Widget.Accordion("menu", { useFixedPanelHeights: false, defaultPanel: -1 });
	
}


function FadeImages() {
	//document.getElementById('infoForm').border.value = $(gImageA).getStyle('border-top-width');
	//alert(gCurrentEffect == null);
	//
	
	document.getElementById('currentPhoto').firstChild.nodeValue = ' ';
	$(document.getElementById('navContainerNew')).setStyle({opacity: 0});

	/*
	if (gCurrentEffect != null) {
		//var displayStyle = $(gImageA).getStyle('display');
		//alert($(gImageA).getStyle('display'));
		$(gImageA).setStyle({visibility: 'hidden'});
		gCurrentEffect.cancel();
		setTimeout("$(gImageA).setStyle({visibility: 'visible'})", 500);
	}
	*/
				
	var url = 'resources/xml/'  + this.id  + '.xml';
		
	if (gSlideShowRunning) {
		StopSlideShow();
	}
		
	//gCurrentImage = 'A';
	
	//if ($(gImageA).getStyle('opacity') == 0 && $(gImageB).getStyle('opacity') == 0 ) {
	if (gCurrentImage == null) {
		$(gLoader).setStyle({opacity: 0.9});
		//gA.src = '/resources/images/blank.png'; gB.src = '/resources/images/blank.png';
		XMLLoad(url);
	//} else if ($(gImageA).getStyle('opacity') != 0 && $(gImageB).getStyle('opacity') == 0 ) {
	} else if (gCurrentImage == 'A') {
		gCurrentEffect = new Effect.Opacity(gImageA,{ 
			duration: .5, from: 0.9, to: 0,
			afterFinish: function(){ 
				//$(gImageA).setStyle({opacity: 0}); 
				$(gLoader).setStyle({opacity: 0.9});
				//gA.src = '/resources/images/blank.png'; gB.src = '/resources/images/blank.png';
				XMLLoad(url);
			}	// END afterFinish:
		});		// END new Effect.Opacity
	//} else if ($(gImageA).getStyle('opacity') == 0 && $(gImageB).getStyle('opacity') != 0 ) {
	} else if (gCurrentImage == 'B') {
		gCurrentEffect = new Effect.Opacity(gImageB,{ 
			duration: .5, from: 0.9, to: 0,
			afterFinish: function(){ 
				$(gImageB).setStyle({opacity: 0}); 
				$(gLoader).setStyle({opacity: 0.9}); 
				//gA.src = '/resources/images/blank.png'; gB.src = '/resources/images/blank.png';
				XMLLoad(url);
			}	// END afterFinish:
		});		// END new Effect.Opacity
	}
	
	
	//gImageACounter = 0;
	//gImageBCounter = 1;
	gCurrentImage = 'A';
	document.getElementById('infoForm').gCurrentImage.value = gCurrentImage;
	document.getElementById('infoForm').gImageACounter.value = gImageACounter;
	document.getElementById('infoForm').gImageBCounter.value = gImageBCounter;
	document.getElementById('infoForm').gCounter.value = gCounter;


	
}

/*
function SwapImages() {
	
	// Asynchronous version. The second image fades-in once the first image has faded-out.
	
	//alert(gCurrentEffect.element.id);
	//gCurrentEffect.cancel();
	
	if (this.id != null) {
		var button = this;
		if (gSlideShowRunning) {
			StopSlideShow();
		}
	} else {
	 	var button = document.getElementById('play');
	}
	
	DisableLinks(true);
	
	//if (gCurrentImage == 'A') {
	
	// fade-out 1st image
	gCurrentEffect = new Effect.Opacity(gImageA,{ 
		duration: gFaderDuration, from: 0.9, to: 0,
		queue: { position: 'front', scope: 'imagescope', limit: 2 },
		afterFinish: function(){
			//SetBorder(gImageA, '0px');
			//IncrementCounter(button,'B');
			
			//alert(gImageBCounter);
			//SetBorder(gImageB, gBorderWidth);
			//document.getElementById('infoForm').gImageBCounter.value = gImageBCounter;
			//document.getElementById('infoForm').gCounter.value = gCounter;

			//Position(gImages[gImageBCounter][1],gImages[gImageBCounter][2], gImageB);

			//gB.src=gImages[gImageBCounter][0];
			//gB.src=gImages[gCounter][0];
			// fade-in 2nd image
			Counter(button);
			gA.src=gImages[gCounter][0];
			SetPosition(gImages[gCounter][3],gImages[gCounter][4], gImageA);
			
		}	
		
	});	
	
	
	gCurrentEffect = new Effect.Opacity(gImageA,{
		duration: gFaderDuration, from: 0, to: 0.9,
		queue: { position: 'end', scope: 'imagescope', limit: 2 },
	
		afterFinish: function(){ 
			DisableLinks(false);
			//gCurrentImage = 'B'
			//document.getElementById('infoForm').gCurrentImage.value = gCurrentImage;
		}
	
	});						
}
*/

function SwapImages() {
	
	// Asynchronous version. The second image fades-in once the first image has faded-out.
	
	if (this.id != null) {
		var button = this;
		if (gSlideShowRunning) {
			StopSlideShow();
		}
	} else {
	 	var button = document.getElementById('play');
	}
	
	DisableLinks(true);
	
	if (gCurrentImage == 'A') {
		// fade-out 1st image
		gCurrentEffect = new Effect.Opacity(gImageA,{ 
			duration: gFaderDuration, from: 0.9, to: 0,
			afterFinish: function(){
				//SetBorder(gImageA, '0px');
				gA.src='/resources/images/blank.png';
				IncrementCounter(button,'B');
				Counter(button);
				//alert(gImageBCounter);
				//SetBorder(gImageB, gBorderWidth);
				document.getElementById('infoForm').gImageBCounter.value = gImageBCounter;
				document.getElementById('infoForm').gCounter.value = gCounter;

				Position(gImages[gImageBCounter][1],gImages[gImageBCounter][2], gImageB);
				//SetPosition(gImages[gCounter][3],gImages[gCounter][4], gImageB);

				//gB.src=gImages[gImageBCounter][0];
				gB.src=gImages[gCounter][0];
				// fade-in 2nd image
				gCurrentEffect = new Effect.Opacity(gImageB,{
					duration: gFaderDuration, from: 0, to: 0.9,
					afterFinish: function(){ 
						DisableLinks(false);
						gCurrentImage = 'B'
						document.getElementById('infoForm').gCurrentImage.value = gCurrentImage;
					}
				});				
			}	
		});		
		
		
	} else {
		
		gCurrentEffect = new Effect.Opacity(gImageB,{ 
			duration: gFaderDuration, from: 0.9, to: 0,
			afterFinish: function(){
				//SetBorder(gImageB, '0px');
				gB.src='/resources/images/blank.png';
				IncrementCounter(button,'A');
				Counter(button);
				//alert(gImageBCounter);
				//SetBorder(gImageA, gBorderWidth);
				document.getElementById('infoForm').gImageACounter.value = gImageACounter;
				document.getElementById('infoForm').gCounter.value = gCounter;

				Position(gImages[gImageACounter][1],gImages[gImageACounter][2], gImageA);
				//SetPosition(gImages[gCounter][3],gImages[gCounter][4], gImageA);

				//gA.src=gImages[gImageACounter][0];
				gA.src=gImages[gCounter][0];
				// fade-in 2nd image
				gCurrentEffect = new Effect.Opacity(gImageA,{
					duration: gFaderDuration, from: 0, to: 0.9,
					afterFinish: function(){ 
						DisableLinks(false);
						gCurrentImage = 'A'
						document.getElementById('infoForm').gCurrentImage.value = gCurrentImage;
					}
				});				
			}	
		});		
		
	}
		
}

function Counter(e) {
	if (e.id == 'next' || e.id == 'play') {
		
			if (gCounter + 1 == gPhotoCount) {
				gCounter = 0;
			} else {
				gCounter = (gCounter + 1);
			}
			
			imageCounter = (gCounter + 1);
		
	} else if (e.id == 'previous') {
		
			if (gCounter - 1 < 0) {
				gCounter = gPhotoCount - 1;
			} else {
				gCounter = (gCounter - 1);
			}
			
			imageCounter = (gCounter + 1);
		
	}
	
	document.getElementById('currentPhoto').firstChild.nodeValue = gXMLAlbumName +' | ' +  imageCounter + ' / ' + gPhotoCount;

}

function IncrementCounter(e, imageCounter) {
	if (e.id == 'next' || e.id == 'play') {
		
		if (imageCounter == 'A') {
			if (gImageBCounter + 1 == gPhotoCount) {
				gImageACounter = 0;
			} else {
				gImageACounter = (gImageBCounter + 1);
			}
			
			imageCounter = (gImageACounter + 1);
		}
		
		if (imageCounter == 'B') {
			if (gImageACounter + 1 == gPhotoCount) {
				gImageBCounter = 0;
			} else {
				gImageBCounter = (gImageACounter + 1);
			}
			
			imageCounter = (gImageBCounter + 1);
		}
		
	}
	
	if (e.id == 'previous') {
		
		if (imageCounter == 'A') {
			if (gImageBCounter - 1 < 0) {
				gImageACounter = gPhotoCount - 1;
			} else {
				gImageACounter = (gImageBCounter - 1);
			}
			
			imageCounter = (gImageACounter + 1);
		}
		
		if (imageCounter == 'B') {
			if (gImageACounter - 1 < 0) {
				gImageBCounter = gPhotoCount - 1;
			} else {
				gImageBCounter = (gImageACounter - 1);
			}
			
			imageCounter = (gImageBCounter + 1);
		}
	}
	
	document.getElementById('currentPhoto').firstChild.nodeValue = gXMLAlbumName +' | ' +  imageCounter + ' / ' + gPhotoCount;
	
}


function Position (imageWidth, imageHeight, e) {
	var imageHolder = document.getElementById('imageContainer');
	
	var widthCalculation = new Array ();
	widthCalculation [0] = parseInt(parseFloat($(imageHolder).getStyle('width')));
	widthCalculation [1] = parseInt(imageWidth);

	var heightCalculation = new Array ();
	heightCalculation [0] = parseInt(parseFloat($(imageHolder).getStyle('height')));
	heightCalculation [1] = parseInt(imageHeight);
	
	$(e).setStyle({left: parseInt((widthCalculation [0] - (widthCalculation [1] + gVerticalBorderWidth)) / 2) + "px"});
	$(e).setStyle({top: parseInt((heightCalculation [0] - (heightCalculation [1] + gHorizontalBorderWidth)) / 2) + "px"});
	
}


function PositionX (imageWidth) {
	var imageHolder = document.getElementById('imageContainer');
	
	var widthCalculation = new Array ();
	widthCalculation [0] = parseInt(parseFloat($(imageHolder).getStyle('width')));
	widthCalculation [1] = parseInt(imageWidth);
	
	return parseInt((widthCalculation [0] - (widthCalculation [1] + gVerticalBorderWidth)) / 2) + "px"	
}

function PositionY (imageHeight) {
	var imageHolder = document.getElementById('imageContainer');
	
	var heightCalculation = new Array ();
	heightCalculation [0] = parseInt(parseFloat($(imageHolder).getStyle('height')));
	heightCalculation [1] = parseInt(imageHeight);
	
	return parseInt((heightCalculation [0] - (heightCalculation [1] + gHorizontalBorderWidth)) / 2) + "px"	
}

function SetPosition (x,y,e) {
	$(e).setStyle({left: x});
	$(e).setStyle({top: y});
}




function ShowImage() {
	//SetBorder(gImageA, '0px');
	//document.getElementById('infoForm').border.value = $(gImageA).getStyle('border-top-width');
	gCurrentEffect = new Effect.Opacity(gImageA,{ 
		duration: gFaderDuration, from: 0, to: 0.9, 
		beforeStart: function(){ 
			$(document.getElementById('loader')).setStyle({opacity: 0}); 
			$(document.getElementById('navContainerNew')).setStyle({opacity: 0.9});
			//alert($(document.getElementById('navContainerNew')).getStyle('visibility'));
			document.getElementById('currentPhoto').firstChild.nodeValue = gXMLAlbumName +' | ' + '1' + ' / ' + gPhotoCount;
			//setTimeout('SetBorder(gImageA, gBorderWidth)', 500)
			//document.getElementById('infoForm').border.value = $(gImageA).getStyle('border-top-width');

		},
		afterFinish: function(){ 
			//$(gImageA).setStyle({opacity: 0.9})
			DisableLinks(false) // Note: This re-enables links disabled in XMLLoad()
		}
	});
}

function DisableLinks (disable) {
	if (disable) {
		Event.stopObserving('esther', 'click');
		Event.stopObserving('bent', 'click');
		Event.stopObserving('shoe', 'click');
		Event.stopObserving('boy-in-a-bubble', 'click');
		Event.stopObserving('twenty-nine', 'click');
		Event.stopObserving('freelance-random', 'click');
		Event.stopObserving(gPrevious, 'click');	
		Event.stopObserving(gNext, 'click');
		Event.stopObserving(gPlay, 'click');
	} else {
		Event.observe('esther', 'click', FadeImages);
		Event.observe('bent', 'click', FadeImages);
		Event.observe('shoe', 'click', FadeImages);
		Event.observe('boy-in-a-bubble', 'click', FadeImages);
		Event.observe('twenty-nine', 'click', FadeImages);
		Event.observe('freelance-random', 'click', FadeImages);
		Event.observe(gPrevious, 'click', SwapImages);
		Event.observe(gNext, 'click', SwapImages);
		Event.observe(gPlay, 'click', ManageSlideShow);
	}
}

function ManageSlideShow() {
	if (gSlideShowRunning == false) {
		StartSlideShow();
	} else {
		StopSlideShow();
	}
}

function StartSlideShow() {
	SwapImages();
	gSlideShowTimer = setInterval('SwapImages()', gSlideShowInterval);
	gSlideShowRunning = true;
	document.getElementById('play').firstChild.nodeValue = 'pause';
}

function StopSlideShow() {
	clearInterval(gSlideShowTimer);
	gSlideShowRunning = false;
	document.getElementById('play').firstChild.nodeValue = 'play';
}


function SetBorder(e, borderWidth) {
	//alert($(gImageA).getStyle('border-top-width'));
	$(e).setStyle({borderBottomWidth: borderWidth});
	$(e).setStyle({borderLeftWidth: borderWidth});
	$(e).setStyle({borderRightWidth: borderWidth});
	$(e).setStyle({borderTopWidth: borderWidth});
	//alert($(gImageA).getStyle('border-top-width'));

}