// This script will be run once before each other script is loaded. Here you
// can define any functions you want to have available in the other scripts,
// or initialisation code you want to have executed only once for each script.

/*MT_F*
    
    MediaTomb - http://www.mediatomb.cc/
    
    common.js - this file is part of MediaTomb.
    
    Copyright (C) 2006-2009 Gena Batyan <bgeradz@mediatomb.cc>,
                            Sergey 'Jin' Bostandzhyan <jin@mediatomb.cc>,
                            Leonhard Wimmer <leo@mediatomb.cc>
    
    This file is free software; the copyright owners give unlimited permission
    to copy and/or redistribute it; with or without modifications, as long as
    this notice is preserved.
    
    This file is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
    
    $Id: common.js 2010 2009-01-11 19:10:43Z lww $
*/

function escapeSlash(name)
{
    name = name.replace(/\\/g, "\\\\");
    name = name.replace(/\//g, "\\/");
    return name;
}

function createContainerChain(arr)
{
    var path = '';
    for (var i = 0; i < arr.length; i++)
    {
        path = path + '/' + escapeSlash(arr[i]);
    }
    return path;
}

function getYear(date)
{
    var matches = date.match(/^([0-9]{4})-/);
    if (matches)
        return matches[1];
    else
        return date;
}

function getPlaylistType(mimetype)
{
    if (mimetype == 'audio/x-mpegurl')
        return 'm3u';
    if (mimetype == 'audio/x-scpls')
        return 'pls';
    return '';
}

function getLastPath(location)
{
    var path = location.split('/');
    if ((path.length > 1) && (path[path.length - 2]))
        return path[path.length - 2];
    else
        return '';
}

function abcbox(stringtobox, boxtype, divchar)
{
	// get ascii value of first character 
	var intchar = stringtobox.toUpperCase().charCodeAt(0);
 
	// check for numbers
	if ( (intchar >= 48) && (intchar <= 57) )
	{
		return divchar + '0-9' + divchar;
	}
	// check for other characters
	if ( !((intchar >= 65) && (intchar <= 90)) )
	{
		return divchar + '^\&#\'' + divchar;
	}
	// all other characters are letters
 
	// definition of box types, adjust to your own needs
	// as a start: the number is the same as the number of boxes, evenly spaced ... more or less.
	switch (boxtype)
	{
	case 1:
		var boxwidth = new Array();
		boxwidth[0] = 26;                             // one large box of 26 letters
		break;
	case 2:
		var boxwidth = new Array(13,13);              // two boxes of 13 letters
		break;
	case 3:
		var boxwidth = new Array(8,9,9);              // and so on ...
		break;
	case 4:
		var boxwidth = new Array(7,6,7,6);
		break;
	case 5:
		var boxwidth = new Array(5,5,5,6,5);
		break;
	case 6:
		var boxwidth = new Array(4,5,4,4,5,4);
		break;
	case 7:
		var boxwidth = new Array(4,3,4,4,4,3,4);
		break;
	case 9:
		var boxwidth = new Array(5,5,5,4,1,6);        // When T is a large box...
		break;
	default:
		var boxwidth = new Array(5,5,5,6,5);
		break;
	}
 
	// check for a total of 26 characters for all boxes
	charttl = 0;
	for (cb=0;cb<boxwidth.length;cb++) { charttl = charttl + boxwidth[cb]; }
	if (charttl != 26) {
		print("Error in box-definition, length is " + charttl + ". Check the file common.js" );
		// maybe an exit call here to stop processing the media ??
		end;
	}
 
	// declaration of some variables
	boxnum=0;                         // boxnumber start
	sc=65;                            // first ascii character (corresponds to 'A')
	ec=sc + boxwidth[boxnum] - 1;     // last character of first box
 
	// loop that will define first and last character of the right box
	while (intchar>ec)
	{
		boxnum++;                         // next boxnumber
		sc = ec + 1;                      // next startchar
		ec = sc + boxwidth[boxnum] - 1;   // next endchar
	}
 
	// construction of output string
	output = divchar;
	for (i=sc;i<=ec;i++) {
		output = output + String.fromCharCode(i);
	}
	output = output + divchar;
	return output;
}

