var Cache = function(useCache){
  /**
  * _cache: {
  *   type: [[list],[list],[list],[list]] 
  * }
  */
  var _cache = {};

  // 提供一个获取type下全部列表的方法，pageNum为null的时候可以调用。
  // 否则，返回type对应pageNum的列表
  function _getCache(type, pageNum) {
    var tempCache = _cache[type];
    if(!!tempCache) {
      if(pageNum == null) {
        return [].concat.apply([], tempCache);
      } else if(!!tempCache[pageNum]) {
        return tempCache[pageNum];
      }
    }
  }

  function _addCache(type, pageNum, data){
    if(!_cache[type]) {
      _cache[type] = [];
    }
    _cache[type][pageNum] = data;
  }

  function _checkCache(type) {
    return _cache[type] ? _cache[type].length : 0;
  }

  function _empty(type){
    if(!!type) {
      _cache[type] = [];
    } else {
      _cache = {};
    }
  }

  return {
    getCache : useCache ? _getCache : $.noop, // 如果不是用cache的话，永远返回null
    addCache : useCache ? _addCache : $.noop,
    checkCache : useCache ? _checkCache : function(){return 0;}, // 如果不用cache的话，长度永远为0
    empty : useCache ? _empty : $.noop
  }
}

var PageData = function(options){
  var settings = {
    cache: false, // 缓存开关
    urls: null,  // {type: url, type2： url2, type3: url3}
    pageSize: 10
  };

  var _setting = Object.assign({}, settings, options);
  var _cache = Cache(_setting.cache);
  var _current; // {type, pageNum, pageSize}

  // 获取对应的数据，会先检查缓存，如果缓存存在，那么用缓存。如果不存在，从后台拿
  function _getData(data){
    var defer = $.Deferred();
    var res = _cache.getCache(data.type, data.pageNum);

    if(!res) {
      $.getJSON(_setting.urls[data.type], data, function(res){
        _cache.addCache(data.type, data.pageNum, res);
        defer.resolve(res);
      }).fail(function(){
        defer.reject();
      });
    } else {
      defer.resolve(res);
    }

    return defer.promise();
  }

  function _insert(){
    var defer = $.Deferred();

    var tempCurrent = Object.assign({}, _current);
    tempCurrent.pageNum++;
    _getData(tempCurrent).done(function(data){
      _current.pageNum++;
      defer.resolve(data);
    }).fail(function(){
      defer.reject("insert");
    });

    return defer.promise();
  }

  function _replace(type){
    var defer = $.Deferred();

    var length = _cache.checkCache(type);

    if( length > 0 ) {
      _current = {type: type, pageNum: length - 1, pageSize: _setting.pageSize};
      defer.resolve(_cache.getCache(type/*, null*/)); // 既然是replace, 那么如果有cache的话，就返回所有的列表
    } else {
      var temp = {type: type, pageNum: 0, pageSize: _setting.pageSize};
      _getData(temp).done(function(data){
        _current = Object.assign({}, temp);
        defer.resolve(data);
      }).fail(function(){
        defer.reject("replace");
      });
    }

    return defer.promise();
  }

  function _getConfig(){
    return Object.assign({}, _current);
  }

  return {
    insert : _insert,
    replace : _replace,
    getConfig : _getConfig,
    emptyCache : _cache.empty
  }
};

var Page = (function(){
  var index = 0,
      instances = {},
      settings = {
        container: null,
        pageData: null,
        template: null,
        defaultType: null
      };

  function _getInstance(options) {
    var key = options.container.data("pageindex");
    if(key != null && instances[key] != null) {
      return instances[key];
    } else if(_validateOptions(options)) {
      options.container.data("pageindex", index);
      return instances[index++] = _init(options); 
    }
  }

  function _validateOptions(options){
    if(!options.pageData || !options.pageData.urls || Object.keys(options.pageData.urls).length == 0) {
      console.error("PageData最少定义一个路径");
      return false;
    }

    if(!$.isFunction(options.template)) {
      console.error("必须定义一个模板");
      return false;
    }

    return true;
  }

  function _init(options){
    var _setting = Object.assign({}, settings, options);
    var pageData = PageData(_setting.pageData);
    var $container = _setting.container,
        template = _setting.template;

    function _insert() {
      pageData.insert().done(function(data){
        $container.append(template(data))
                  .trigger("insert.page", [pageData.getConfig(), data]);
      }).fail(function(type){
        $container.trigger("fail.page", [type, pageData.getConfig()]);
      });
    }

    function _replace(type){
      pageData.replace(type).done(function(data){
        $container.empty()
                  .append(template(data))
                  .trigger("replace.page", [pageData.getConfig(), data]);
      }).fail(function(type){
        $container.trigger("fail.page", [type, pageData.getConfig()]);
      });
    }

    // 如果empty当前type的cache的话，会造成cache排序的错误，所以如果清除当前cache的时候，就重新replace一下当前的type
    function _emptyCache(type){
      // 只有打开了开关，才需要清除缓存
      if(_setting.pageData.cache){
        var pageInfo = pageData.getConfig();

        pageData.emptyCache(type);
        if(type == null || type === pageInfo.type) {
          _replace(pageInfo.type);
        }
      } else {
        console.log("Cache is not enabled");
      }
    }

    if(_setting.defaultType != null && _setting.pageData.urls[_setting.defaultType]) {
      _replace(defaultType);
    }

    return {
      replace : _replace,
      insert : _insert,
      initData : _replace,
      getPageInfo : pageData.getConfig,
      emptyCache : _emptyCache
    };
  }

  return {
    getInstance: function(options) {
      options.container = $(options.container);
      if(options.container.length != 1) {
        console.error("container不存在或者多于一个");
        return null;
      }

      return _getInstance(options);
    }
  }
})();

$.Page = Page;
