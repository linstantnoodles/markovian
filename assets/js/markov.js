/**
 * Markov Constructor
 * Creates chain based on input str and order 
 *
 * @param  <String> str
 * @param  number order  
 * @param  <Object> options
 * @return void
 */
var Markov = function (str, order, options) {
  this.init(str, order, options);
};

Markov.prototype = (function () {
  var NONWORD = "NONWORD",
      settings = {
        delim : "",
        outputLen : 100
      },
      state,
      input,
      tokens,
      markovChain,
      chainOrder,
      init,
      makeChain,
      pushChain,
      each,
      pick,
      initState,
      initRstate,
      nextState,
      getChain;
      
  /**
   * Initialization of Markov Chain
   * Sets the order of chain states
   *
   * @param  <String> str
   * @param  number order 
   * @param  <Object> options
   * @return void
   */
  init = function (str, order, options) {
    if (options) {
      settings.delim = options.delim;
      settings.outputLen = options.outputLen;
    }
    order = Number(order);
    chainOrder = order > 0 ? order : 1;
    input = str;
    makeChain(input);
  };

  /**
   * Create the chain
   *
   * @param  void
   * @return void
   */
  makeChain = function () {
    var strList = input.split(settings.delim),
        i,
        c;
    tokens = strList;
    initState();
    markovChain = {};
    for (i = 0; i < strList.length; i++) {
      c = strList[i];
      pushChain(c);
      nextState(c);
    }
    pushChain(NONWORD);
  };

  /**
   * Insert a single token
   *
   * @param  <String> tok
   * @return void
   */
  pushChain = function (tok) {
    var chain = markovChain,
        lastPos = chainOrder - 1,
        i;
    for (i = 0; i < lastPos; i++) {
      if (typeof chain[state[i]] === 'undefined') {
        chain[state[i]] = {};
      }
      chain = chain[state[i]];
    }
    if (typeof chain[state[lastPos]] === 'undefined') {
      chain[state[lastPos]] = [];
    }
    chain[state[lastPos]].push(tok);
  };

  /**
   * Markov Chain output
   * Apply lambda to each tok returned 
   *
   * @param  <Function> lambda
   * @return void
   */
  each = function (lambda) {
    initRstate();
    for (var i = 0; i < settings.outputLen; i++) {
      var p = pick();
      if (p === NONWORD) {
        initState();
      } else {
        lambda.apply(null, [p]);
      }
      nextState(p);
    }
  };

  /**
   * Get single tok
   *
   * @param  void
   * @return string
   */
  pick = function () {
    var chain = markovChain,
        i,
        r;
    for (i = 0; i < chainOrder; i++) {
      chain = chain[state[i]];
    }
    r = Math.floor(Math.random() * chain.length);
    return chain[r];
  };

  /**
   * Initital state initialization
   *
   * @param  void
   * @return void
   */
  initState = function () {
    state = [];
    for (var i = 0; i < chainOrder; i++) {
      state[i] = NONWORD;
    }
  };
   
   /**
   * Random state initialization
   *
   * @param  void
   * @return void
   */
  initRstate = function () {
    var chain = markovChain,
        list,
        i, 
        r;
    for(i = 0; i < chainOrder; i++) {
        list = [];
        for (var a in chain) { 
          list.push(a);
        }
        r = Math.floor(Math.random() * list.length);
        state[i] = list[r];
        chain = chain[list[r]];
     }
  };

  /**
   * Update state with new token
   *
   * @param  <String> tok
   * @return void
   */
  nextState = function(tok) {
    var lastPos = chainOrder - 1,
        i;
    for (i = 0; i < lastPos; i++) {
      state[i] = state[i + 1];
    }
    state[lastPos] = tok;
  };

  /**
   * Get the generated chain
   *
   * @param  void
   * @return <Object>
   */
  getChain = function () {
    return markovChain;
  };

  return {
    init:     init,
    each:     each,
    getChain: getChain
  };
})();
