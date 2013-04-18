var fs = require('fs'), util = require('util');

var assets_dir = "./assets";

//get default texts. These will go into mongodb later. HC'd for now.
function getText(res, id) {
  var text, title;

  var pg = "Why is it so important to work on a problem you have? Among other things, it " + 
  "ensures the problem really exists. It sounds obvious to say you should only work on problems that exist. " + 
  "And yet by far the most common mistake startups make is to solve problems no one has.I made it myself." + 
  "In 1995 I started a company to put art galleries online. But galleries didn't want to be online. It's not how " + 
  "the art business works. So why did I spend 6 months working on this stupid idea? Because I didn't pay attention to users. " + 
  "I invented a model of the world that didn't correspond to reality, and worked from that. I didn't notice my model was " + 
  "wrong until I tried to convince users to pay for what we'd built. Even then I took embarrassingly long to catch on. " + 
  "I was attached to my model of the world, and I'd spent a lot of time on the software. They had to want it!" + 
  "Why do so many founders build things no one wants? Because they begin by trying to think of startup ideas. " + 
  "That m.o. is doubly dangerous: it doesn't merely yield few good ideas; " + 
  "it yields bad ideas that sound plausible enough to fool you into working on them.";

  var confucius = "WHAT THE GREAT LEARNING teaches, is to illustrate illustrious " + 
  "virtue; to renovate the people; and to rest in the highest excellence. " + 
  "The point where to rest being known, the object of pursuit is then " + 
  "determined; and, that being determined, a calm unperturbedness may " + 
  "be attained to. To that calmness there will succeed a tranquil repose. " + 
  "In that repose there may be careful deliberation, and that" + 
  "deliberation will be followed by the attainment of the desired end. " + 
  "Things have their root and their branches. Affairs have their end" + 
  "and their beginning. To know what is first and what is last will " + 
  "lead near to what is taught in the Great Learning."

  var shakespeare = "And I in going, madam, weep o'er my father's death " + 
  "anew: but I must attend his majesty's command, to " + 
  "whom I am now in ward, evermore in subjection. " + 
  "You shall find of the king a husband, madam; you, " + 
  "sir, a father: he that so generally is at all times " + 
  "good must of necessity hold his virtue to you; whose " + 
  "worthiness would stir it up where it wanted rather " + 
  "than lack it where there is such abundance. ";

  if (id == 1) {
    title = "Paul Graham";
    text = pg;
  }
  if (id == 2) {
    title = "Shakespeare";
    text = shakespeare;
  }
  if (id == 3) {
    title = "Confucius";
    text = confucius
  }

  res.json({
    id : id,
    title : title,
    text : text
  });
}

exports.getText = getText;
