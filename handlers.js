var fs = require('fs'),
	util = require('util'),
	
var assets_dir = "./assets";

//post an image
function getText(res, id) {
    var text = "Why is it so important to work on a problem you have? Among other things, it "+
    "ensures the problem really exists. It sounds obvious to say you should only work on problems that exist. " +
    "And yet by far the most common mistake startups make is to solve problems no one has.I made it myself." + 
    "In 1995 I started a company to put art galleries online. But galleries didn't want to be online. It's not how "+ 
    "the art business works. So why did I spend 6 months working on this stupid idea? Because I didn't pay attention to users. " +
    "I invented a model of the world that didn't correspond to reality, and worked from that. I didn't notice my model was " +
    "wrong until I tried to convince users to pay for what we'd built. Even then I took embarrassingly long to catch on. " +
    "I was attached to my model of the world, and I'd spent a lot of time on the software. They had to want it!" +
    "Why do so many founders build things no one wants? Because they begin by trying to think of startup ideas. " +
    "That m.o. is doubly dangerous: it doesn't merely yield few good ideas; "+
    "it yields bad ideas that sound plausible enough to fool you into working on them.";
    res.json({ id: id, title: "Paul Graham", text: text });
}

exports.getText = getText;