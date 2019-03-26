// JavaScript Document

// This includes the simplified Asynchronous version of SwapImages().

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
var gCounter;
var gNewImage;
var gMinImageOpacity;
var gMaxImageOpacity;

function Initialise () {
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
	gHorizontalBorderWidth = parseInt(parseFloat($(gImageA).getStyle('border-top-width'))) + parseInt(parseFloat($(gImageA).getStyle('border-bottom-width')));
	gVerticalBorderWidth = parseInt(parseFloat($(gImageA).getStyle('border-left-width'))) + parseInt(parseFloat($(gImageA).getStyle('border-right-width')));
	gSlideShowInterval = 5000;
	gSlideShowRunning = false;
	gCurrentImage = 'A';
	gMinImageOpacity = 0;
	gMaxImageOpacity = 0.99;		// Avoid setting this to 1 when using Prototypes' setStyle() or Scriptaculous' Effect.Opacity() as it causes the JavaScript to terminate with unknown errors! 
									// We call FixImageOpacity() after the image has faded-in to set the opacity to 1
									
	fadeInSplashPhoto = false;
	Event.observe('esther', 'click', FadeImages);
	Event.observe('bent', 'click', FadeImages);
	Event.observe('shoe', 'click', FadeImages);
	Event.observe('boy-in-a-bubble', 'click', FadeImages);
	Event.observe('twenty-nine', 'click', FadeImages);
	Event.observe('freelance-random', 'click', FadeImages);
	Event.observe(gPrevious, 'click', SwapImages);
	Event.observe(gNext, 'click', SwapImages);
	Event.observe(gPlay, 'click', ManageSlideShow);	
	
	//gA.src = 'resources/images/photo_works/estherweb/esther4.png';
	gA.setAttribute('src', 'resources/images/photo_works/estherweb/esther4.jpg');
	SetPosition( PositionX('361'),PositionY('504'), gImageA );
	
	if (fadeInSplashPhoto) {
		new Effect.Opacity(gImageA,{ 
			duration: gFaderDuration, from: gMinImageOpacity, to: gMaxImageOpacity, 
			afterFinish: function(){
				FixImageOpacity(gImageA);
			}
		});
	}else{
		$(gImageA).setStyle({opacity: gMaxImageOpacity});
	}
	
	gMenu = new Spry.Widget.Accordion("menu", { useFixedPanelHeights: false, defaultPanel: -1 });
	
	//document.getElementById('infoForm').modified.value = document.scripts[0]
	
}


function FadeImages() {
	
	var url = 'resources/xml/'  + this.id  + '.xml';
		
	if (gSlideShowRunning) {
		StopSlideShow();
	}
		
	document.getElementById('currentPhoto').firstChild.nodeValue = ' ';
	$(document.getElementById('navContainer')).setStyle({opacity: gMinImageOpacity});
	
	if (gCurrentImage == null) {
		$(gLoader).setStyle({opacity: gMaxImageOpacity});
		//gA.src = '/resources/images/blank.png'; gB.src = '/resources/images/blank.png';
		gA.removeAttribute('src'); gB.removeAttribute('src'); 
		XMLLoad(url);
	} else if (gCurrentImage == 'A') {
		new Effect.Opacity(gImageA,{ 
			duration: .5, from: gMaxImageOpacity, to: gMinImageOpacity,
			afterFinish: function(){ 
				$(gImageA).setStyle({opacity: gMinImageOpacity}); 
				$(gLoader).setStyle({opacity: gMaxImageOpacity});
				//gA.src = '/resources/images/blank.png'; gB.src = '/resources/images/blank.png';
				gA.removeAttribute('src'); gB.removeAttribute('src'); 
				XMLLoad(url);
			}	
		});	
	} else if (gCurrentImage == 'B') {
		new Effect.Opacity(gImageB,{ 
			duration: .5, from: gMaxImageOpacity, to: gMinImageOpacity,
			afterFinish: function(){ 
				$(gImageB).setStyle({opacity: gMinImageOpacity}); 
				$(gLoader).setStyle({opacity: gMaxImageOpacity}); 
				//gA.src = '/resources/images/blank.png'; gB.src = '/resources/images/blank.png';
				gA.removeAttribute('src'); gB.removeAttribute('src'); 
				XMLLoad(url);
			}
		});	
	}
	
	gCurrentImage = 'A';
	
}


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
	
	
	if (gCurrentImage == 'A') {
		var a = gImageA;
		var b = gImageB;
		var c = gA;
		var d = gB;
		var e = 'B';
	} else {
		var a = gImageB;
		var b = gImageA;
		var c = gB;
		var d = gA;
		var e = 'A';
	}
	
	DisableLinks(true);
	
	// fade-out 1st image
	new Effect.Opacity(a,{ 
		duration: gFaderDuration, from: gMaxImageOpacity, to: gMinImageOpacity,
		queue: { position: 'front', scope: 'imagescope', limit: 2 },
		afterFinish: function(){
			//c.src='/resources/images/blank.png';
			c.removeAttribute('src');
			Counter(button);
			SetPosition(gImages[gCounter][3],gImages[gCounter][4], b);
			//d.src=gImages[gCounter][0];
			d.setAttribute('src', gImages[gCounter][0]);
		}	
	});	
	
	// fade-in 2nd image
	new Effect.Opacity(b,{
		duration: gFaderDuration, from: gMinImageOpacity, to: gMaxImageOpacity,
		queue: { position: 'end', scope: 'imagescope', limit: 2 },
		afterFinish: function(){
			FixImageOpacity(b);			
			//document.getElementById('infoForm').opacity.value = $(b).getStyle('opacity');
			DisableLinks(false);
			gCurrentImage = e;
			//alert(document.images.length);
		}
	});				
			
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
	//alert(gNewImage.src);
	new Effect.Opacity(gImageA,{ 
		duration: gFaderDuration, from: gMinImageOpacity, to: gMaxImageOpacity, 
		beforeStart: function(){ 
			$(document.getElementById('loader')).setStyle({opacity: gMinImageOpacity}); 
			$(document.getElementById('navContainer')).setStyle({opacity: gMaxImageOpacity}); 
			document.getElementById('currentPhoto').firstChild.nodeValue = gXMLAlbumName +' | ' + '1' + ' / ' + gPhotoCount;
		},
		afterFinish: function(){
			FixImageOpacity(gImageA);
			DisableLinks(false) // Note: This re-enables links disabled in XMLLoad()
			//document.getElementById('infoForm').opacity.value = $(gImageA).getStyle('opacity');
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
	$(e).setStyle({borderBottomWidth: borderWidth});
	$(e).setStyle({borderLeftWidth: borderWidth});
	$(e).setStyle({borderRightWidth: borderWidth});
	$(e).setStyle({borderTopWidth: borderWidth});
}

function SetOpacity(e, opacityValue) {
	e.style.opacity = opacityValue;
	e.style.filter = 'alpha(opacity=' + opacityValue * 100 + ')';	// For IE
}

function FixImageOpacity(e) {
	if ($(e).getStyle('opacity') == .99) {
		SetOpacity(e, 1);
	};
}