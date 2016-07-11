# practice
记录一些自己的练习代码
<pre>
关于Page.js的用法：
1. 引入jquery.js和page.js
2. 调用Page(或者$.Page)的getInstance方法，传入settings，settings配置入下：


settings:
{
  container: "#id", // 也可以是jquery对象，或者其他selector，必须
  template: function, // 必须是一个function, 接收数据返回html，第一次初始化必须
  pageData: {
    cache: false, // 是否开启本地缓存，默认关闭
    pageSize: 10, // 每页大小。会传给后台，后台可以忽略不用。默认为10
    defaultType: type1, // 默认的type，会自动初始化首页。如果不设置，需要手动调用初始化数据
    urls: {// 第一次初始化必须
      type1: url1,
      type2: url2,
      type3: url3
    }
  }
}


var page = $.Page.getInstance(settings); // 或者Page.getInstance(settings)
如果没有传入defaultType，那么需要在初始化后，手动调用page.initData(type)方法进行数据初始化。

同时，Page.getInstance会根据container的不同，给不同的page对象。相同container会提供同一个page对象。
所以，在不同js文件中，不需要利用全局变量来分享page，可以直接通过getInstance同一个jquery对象来操作。注意：初始化一次后，下次获取只用传入container配置

page提供5个方法，便于操作~
page.replace(type); // 更换当前界面, type为新的type
page.insert(); // 插入数据都后面
page.initData(); // 初始化数据，其实就是调用了replace
page.getPageInfo(); // 获取当前的配置信息 {type, pageNum, pageSize}
page.emptyCache(type); // 清除本地缓存。如果type不填，那么清楚所有缓存。注意：当清除当前type的缓存的时候，当前的列表会用新数据重新replace一遍


Page.js对container绑定了几个事件：
$container.on("insert.page", function(event, config, data){}) // insert数据成功后会trigger。config是当前页面的配置，获取的data
$container.on("replace.page", function(event, config, data){}) // replace......
$container.on("fail.page", function(event, type, config){}) // 获取数据失败以后会trigger。type是insert/replace, config是当前页面的配置
</pre>
