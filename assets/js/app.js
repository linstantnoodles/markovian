  (function ($) {
    MarkovModel = Backbone.Model.extend({
      slideLen: null,
      word: null,
      length: null,
    });
    
    TextModel = Backbone.Model.extend({
      id: null,
      title: null,
      text: null,
      urlRoot: "/text",
      url: function(options) {return this.urlRoot + "/" + this.id;}
    });
    
    Texts = Backbone.Collection.extend({
     initialize: function (models, options) {
        //this.bind("reset", options.view.processText);
      },
      model: TextModel
    });

    //master model
    var settings = {
      slideLen : 0,
      word : false,
      length : 100,
    };
    
    var info = new MarkovModel(settings);
    
    AppView = Backbone.View.extend({
      el: $("body"),
      initialize: function () {
        _.bindAll(this);
        this.texts = new Texts( null, { view: this });
      },
      events: {
        "click #gen-text" : "processText",
        "change #slider1" : "updateSlide",
        "click #set-text" : "setText",
        "click #clear-text" : "clearText"
      },
      processText: function() {
          var text = $("#text-input").val(),
              len = $("#text-length").val(),  
              word = $('input:radio[name=r1]:checked').val(),
              order = info.get('slideLen') / 20,
              del,
              options,
              chain,
              str;
          del = (word == "word") ? " " : "";
          options = {delim : del, outputLen: len};
          chain = new Markov(text, order, options);
          str = '';
          chain.each(function(w){
            str += w + del;
          });
          $("#text-output").val(str);
      },
      updateSlide: function(e, val) {
        var color = 'green';
        if (val > 30) {
          color = 'orange';
        }
        if (val > 70) {
          color = 'red';
        }
        info.set("slideLen", val); //set the value in global model
        if (val % 20 == 0) {
          $("#slider1_value").html(val/20);
        }
        $("#slider1").children(".complete").css("background-color",  color);
      },
      setText: function() {
          var id = $('select[name=default-text] > option:selected').val(),
              text;
          var model = this.texts.get(id);
          if (model) {
              text = model.get("text");
              $("#text-input").val(text);
          }else{
              var new_m = new TextModel({id: id});
              var callback = function (model, response, options) {
                  text = model.get("text");
                  $("#text-input").val(text);
              }
              new_m.fetch({success: callback});
              this.texts.add(new_m);
          } 
      },
      clearText: function() {
          var text = "";
          $("#text-input").val(text);
          $("#text-output").val(text);
      }
    });
    
    var appview = new AppView;
    
  })(jQuery);