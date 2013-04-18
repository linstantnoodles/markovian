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
    }
  });

  var appview = new AppView;

})(jQuery);
