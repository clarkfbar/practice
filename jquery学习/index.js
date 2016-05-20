/**
 * Session manager
 * A time-eventing module that will perform one to many events on an interval if there has been activity.
 * If no activity has occurred within so many intervals (_timeoutCount), a timeout event will be called passing a callback to start the intervals again.
 * This is commonly used for pinging the server and prompting for session timeout.
 */

define(['jQuery'], 
function($) {
  var SessionManager = function(config) {
      var cfg = _.defaults(_.pick(config, _.keys(SessionManager.Config)), SessionManager.Config);
      
      if (_.isFunction(cfg.events)) cfg.events = [cfg.events]; //Convert to array
      _.extend(this, cfg);
      if (!this.logger) this.debug = false; // In case no logger is available
      if (this.debug) this.logger.info("Configuration set", cfg);
  
      // Check for required settings
      if (!this.interval) throw "Interval is required";
      if (!this.events || !this.events.length) throw "At least one event is required";
      if (!this.timeoutEvent) throw "No timeout event given";
      
      this.$el = $(this.selector);
      _.bindAll(this, 'reportActivity', 'start', 'handleInterval');
      
      this.setActive(false);
      // Start the process
      this.start(cfg.initialPing);
      
      this.initializeUserSession();
    };
    
  // Get cookie value by key name
  var getCookie = function(name) {
    var nameEquals = escape(name) + "=";
    var ca = document.cookie.split(";");
    for (var i = 0, len = ca.length; i < len; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
          c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEquals) === 0) {
          return unescape(c.substring(nameEquals.length, c.length));
          }
    }
    return null;
  };
  
  $.extend(SessionManager.prototype, {
    $el           : undefined,
    selector      : undefined,
    triggers      : undefined,
    interval      : undefined,
    logger        : undefined,
    events        : undefined,
    timeoutEvent  : undefined,
    timeouts      : undefined,
    debug         : undefined,

    _id           : undefined,
    _timeoutCount : undefined,
    
    addEvent : function(event) {
      if (_.isArray(event)) {
        _.each(event, function(evt) {
          this.addEvent(evt);
        }, this);
      } else if (_.isFunction(event)) {
        this.events.push(event);
      } else {
        throw "Event must be a function";
      }
    },
    
    performEvents : function() {
      var debugMsg;
      
      if (this.debug) {
        debugMsg = "Performing {0} events".format(this.events.length);
        this.logger.time(debugMsg);
      }
      
      _.each(this.events, function(event) {
        event();
      }, this);
      
      if (this.debug) this.logger.timeEnd(debugMsg);
    },
    
    reportActivity : function() {
      if (this.debug) this.logger.info("Reporting activity");
      this.setActive(true);
    },
    
    start : function(initialPing) {
      this._timeoutCount = 0;
      if (!this._id) {
        this._id = setInterval(this.handleInterval, this.interval);
        if (this.debug) this.logger.info("Monitoring started - Interval ID {0}".format(this._id));

        this.$el.on(this.triggers, this.reportActivity);
        
        if (initialPing) {
          this.reportActivity();
          this.handleInterval();
        }
      }
    },
    
    handleInterval : function() {
      if (this.isActive()) {
        this.setActive(false);
        this.performEvents();
        this._timeoutCount = 0;
      } else {
        if (++this._timeoutCount == this.timeouts) {
          if (this.debug) this.logger.info("Timing out!");
          this.stop();
          this.timeoutEvent(_.partial(this.start, true)); // Give callback that starts with initialPing
        } else if (this.debug) {
          this.logger.info("No activity in {0} milliseconds - timing out in {1} milliseconds".format(this._timeoutCount * this.interval, (this.timeouts - this._timeoutCount) * this.interval));
        }
      }
    },
    
    isActive: function(){
      return JSON.parse(localStorage.getItem("sessionManager")).activity == true;
    },
    
    setActive: function(isActive){
      localStorage.setItem("sessionManager", JSON.stringify({
        activity : isActive,
      }));
    },
    
    stop : function() {
      if (this.debug) this.logger.info("Stopping monitoring");
      clearInterval(this._id);
      this.$el.off(this.triggers, this.reportActivity);
      this._id = undefined; 
    },
    
    initializeUserSession : function(){
      // Clear localStorage if it has a new sessionId
      var newSessionId = getCookie("JSESSIONID");
      var oldSessionId = localStorage.getItem("userSessionId");
      if(newSessionId !== oldSessionId) {
        this._clearUserSession();
        localStorage.setItem("userSessionId", newSessionId);
      }
    },
    
    _getUserSessionKeys  : function(){
      return JSON.parse(localStorage.getItem("userSessionKeys"));
    },
    
    _addUserSessionKeys : function(key){
      var userSessionKeys = this._getUserSessionKeys();
      
      if(!userSessionKeys) userSessionKeys = new Array();
      
      userSessionKeys.push(key);
      userSessionKeys = $.unique(userSessionKeys);
      
      localStorage.setItem("userSessionKeys", JSON.stringify(userSessionKeys));
    },
    
    _clearUserSession : function(){
      var userSessionKeys = this._getUserSessionKeys();
      
      if(userSessionKeys && userSessionKeys.length){
        _.each(userSessionKeys, function(key){
          localStorage.removeItem(key);
        });
      }
    },
    
    _getUserSessionKey : function(key){
      return "userSessionKey_" + key;
    },
    
    getUserSessionData : function(key){
      return JSON.parse(localStorage.getItem(this._getUserSessionKey(key)));
    },
    
    setUserSessionData : function(key, value){
      var _key = this._getUserSessionKey(key);
      
      localStorage.setItem(_key, JSON.stringify(value));
      
      this._addUserSessionKeys(_key);
    }
  });
  
  $.extend(SessionManager, {
    Config : {
      selector     : 'body',
      triggers     : 'click keydown mousewheel',
      interval     : 600000,  // 10 minutes
      events       : undefined,
      timeoutEvent : undefined,
      timeouts     : 2, // 20 minutes
      debug        : false,
      logger       : window.log,
      initialPing  : false
    }
  });
  
  return SessionManager;
});
