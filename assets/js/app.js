(function($) {
  var settings = {
    slideLen : 0,
  };
  
  TextModel = Backbone.Model.extend({
    id : null,
    title : null,
    text : null,
    urlRoot : "/text",
    url : function() {
      return this.urlRoot + "/" + this.id;
    }
  });
  
  Texts = Backbone.Collection.extend({
    model : TextModel
  });

  AppView = Backbone.View.extend({
    el : $("body"),
    
    initialize : function() {
      _.bindAll(this);
      this.texts = new Texts(null, {
        view : this
      });
    },
    
    // DOM events specific to elements
    events : {
      "click #gen-text" : "processText",
      "click #set-text" : "setText",
      "click #clear-text" : "clearText",
      "click #markovDialog" : "showMarkovDialog",
      "change #slider1" : "updateSlide"
    },
    
    // Generate the markov output
    processText : function() {
      var text = $("#text-input").val(), 
          len = $("#text-length").val(), 
          by = $('input:radio[name=r1]:checked').val(), 
          order = settings.slideLen / 20, 
          delim, 
          options, 
          chain, 
          str;
      delim = (by == "word") ? " " : "";
      options = {
        delim : delim,
        outputLen : len
      };
      chain = new Markov(text, order, options);
      str = '';
      chain.each(function(w) {
        str += w + delim;
      });
      $("#text-output").val(str);
    },
    
    // Update color and displayed value of slider
    updateSlide : function(e, val) {
      var color = 'green';
      if (val > 30) {
        color = 'orange';
      }
      if (val > 70) {
        color = 'red';
      }
      settings.slideLen = val;
      if (val % 20 == 0) {
        $("#slider1_value").html(val / 20);
      }
      $("#slider1")
        .children(".complete")
        .css("background-color", color);
    },
    
    // Set a default text input
    setText : function() {
      var id = $('select[name=default-text] > option:selected').val(), 
          model = this.texts.get(id),
          callBack,
          newText;
      if (model) {
        $("#text-input").val(model.get("text"));
      } else {
        newText = new TextModel({
          id : id
        });
        callBack = function(model, response, options) {
          $("#text-input").val(model.get("text"));
        }
        newText.fetch({
          success : callBack
        });
        this.texts.add(newText);
      }
    },
    
    // clear both textareas 
    clearText : function() {
      $("#text-input").val("");
      $("#text-output").val("");
    },
    
    showMarkovDialog : function() {
      var src, 
          markovAbout, 
          moreInfo;
      src = "<p>From <a href=\"http://en.wi" +
      "kipedia.org/wiki/Markov_chain\"" +
      "target=\"__blank\">Wikipedia</a></p>";
      markovAbout = "<p>A Markov chain (discrete-time " +
      "Markov chain or DTMC[1]) named " +
      "after Andrey Markov, is a mat" +
      "hematical system that undergoe" +
      "s transitions from one state t" +
      "o another, between a finite or " +
      "countable number of possible " +
      "states. It is a random process " +
      "usually characterized as memo" +
      "ryless: the next state depends " +
      "only on the current state and " +
      "not on the sequence of events " +
      "that preceded it. This specif" +
      "ic kind of \"memorylessness\" is " +
      "called the Markov property. M" +
      "arkov chains have many applica" +
      "tions as statistical models of " +
      "real-world processes</p>";
      moreInfo = "<p>To learn more, check out: <" +
      "/p><ul><li><a href=\"http://st" +
      "ackoverflow.com/questions/4081" +
      "662/explain-markov-chain-algor" +
      "ithm-in-laymans-terms\" target=\"__blank\">Explai" +
      "n markov-chain algorithm in la" +
      "yman's terms</a></li><li><a hr" +
      "ef=\"http://www.codinghorror.c" +
      "om/blog/2008/06/markov-and-you" +
      ".html\" target=\"__blank\">Markov and You</a></li" +
      "><ul>";
      $.Dialog({
        'title' : 'What is a Markov Chain?',
        'content' : src + markovAbout + moreInfo,
        'draggable' : true,
        'overlay' : true,
        'closeButton' : true,
        'buttonsAlign' : 'left',
        'position' : {
          'zone' : 'middle'
        },
        'buttons' : {
          'Close' : {
            'action' : function() {
            }
          }
        }
      });
    }
    
  });

  var appview = new AppView;

})(jQuery);
