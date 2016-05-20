(function(){
  var data = [{"id":1357,"name":"山东省","isParent":true,"checked":false,"chkDisabled":false,"pId":0},{"id":1358,"name":"济南市","isParent":true,"checked":false,"chkDisabled":false,"pId":1357},{"id":1359,"name":"历下区","isParent":false,"checked":false,"chkDisabled":false,"pId":1358},{"id":1360,"name":"市中区","isParent":false,"checked":false,"chkDisabled":false,"pId":1358},{"id":1361,"name":"槐荫区","isParent":false,"checked":false,"chkDisabled":false,"pId":1358},{"id":1362,"name":"天桥区","isParent":false,"checked":false,"chkDisabled":false,"pId":1358},{"id":1363,"name":"历城区","isParent":false,"checked":false,"chkDisabled":false,"pId":1358},{"id":1364,"name":"长清区","isParent":false,"checked":false,"chkDisabled":false,"pId":1358},{"id":1365,"name":"平阴县","isParent":false,"checked":false,"chkDisabled":false,"pId":1358},{"id":1366,"name":"济阳县","isParent":false,"checked":false,"chkDisabled":false,"pId":1358},{"id":1367,"name":"商河县","isParent":false,"checked":false,"chkDisabled":false,"pId":1358},{"id":1368,"name":"章丘市","isParent":false,"checked":false,"chkDisabled":false,"pId":1358},{"id":1369,"name":"青岛市","isParent":true,"checked":false,"chkDisabled":false,"pId":1357},{"id":1370,"name":"市南区","isParent":false,"checked":false,"chkDisabled":false,"pId":1369},{"id":1371,"name":"市北区","isParent":false,"checked":false,"chkDisabled":false,"pId":1369},{"id":1372,"name":"四方区","isParent":false,"checked":false,"chkDisabled":false,"pId":1369},{"id":1373,"name":"黄岛区","isParent":false,"checked":false,"chkDisabled":false,"pId":1369},{"id":1374,"name":"崂山区","isParent":false,"checked":false,"chkDisabled":false,"pId":1369},{"id":1375,"name":"李沧区","isParent":false,"checked":false,"chkDisabled":false,"pId":1369},{"id":1376,"name":"城阳区","isParent":false,"checked":false,"chkDisabled":false,"pId":1369},{"id":1377,"name":"胶州市","isParent":false,"checked":false,"chkDisabled":false,"pId":1369},{"id":1378,"name":"即墨市","isParent":false,"checked":false,"chkDisabled":false,"pId":1369},{"id":1379,"name":"平度市","isParent":false,"checked":false,"chkDisabled":false,"pId":1369},{"id":1380,"name":"胶南市","isParent":false,"checked":false,"chkDisabled":false,"pId":1369},{"id":1381,"name":"莱西市","isParent":false,"checked":false,"chkDisabled":false,"pId":1369},{"id":1443,"name":"泰安市","isParent":true,"checked":false,"chkDisabled":false,"pId":1357},{"id":1444,"name":"泰山区","isParent":false,"checked":false,"chkDisabled":false,"pId":1443},{"id":1445,"name":"岱岳区","isParent":false,"checked":false,"chkDisabled":false,"pId":1443},{"id":1446,"name":"宁阳县","isParent":false,"checked":false,"chkDisabled":false,"pId":1443},{"id":1447,"name":"东平县","isParent":false,"checked":false,"chkDisabled":false,"pId":1443},{"id":1448,"name":"新泰市","isParent":false,"checked":false,"chkDisabled":false,"pId":1443},{"id":1449,"name":"肥城市","isParent":false,"checked":false,"chkDisabled":false,"pId":1443},{"id":1417,"name":"潍坊市","isParent":true,"checked":false,"chkDisabled":false,"pId":1357},{"id":1418,"name":"潍城区","isParent":false,"checked":false,"chkDisabled":false,"pId":1417},{"id":1419,"name":"寒亭区","isParent":false,"checked":false,"chkDisabled":false,"pId":1417},{"id":1420,"name":"坊子区","isParent":false,"checked":false,"chkDisabled":false,"pId":1417},{"id":1421,"name":"奎文区","isParent":false,"checked":false,"chkDisabled":false,"pId":1417},{"id":1422,"name":"临朐县","isParent":false,"checked":false,"chkDisabled":false,"pId":1417},{"id":1423,"name":"昌乐县","isParent":false,"checked":false,"chkDisabled":false,"pId":1417},{"id":1424,"name":"青州市","isParent":false,"checked":false,"chkDisabled":false,"pId":1417},{"id":1425,"name":"诸城市","isParent":false,"checked":false,"chkDisabled":false,"pId":1417},{"id":1426,"name":"寿光市","isParent":false,"checked":false,"chkDisabled":false,"pId":1417},{"id":1427,"name":"安丘市","isParent":false,"checked":false,"chkDisabled":false,"pId":1417},{"id":1428,"name":"高密市","isParent":false,"checked":false,"chkDisabled":false,"pId":1417},{"id":1429,"name":"昌邑市","isParent":false,"checked":false,"chkDisabled":false,"pId":1417},{"id":1463,"name":"临沂市","isParent":true,"checked":false,"chkDisabled":false,"pId":1357},{"id":1464,"name":"兰山区","isParent":false,"checked":false,"chkDisabled":false,"pId":1463},{"id":1465,"name":"罗庄区","isParent":false,"checked":false,"chkDisabled":false,"pId":1463},{"id":1466,"name":"河东区","isParent":false,"checked":false,"chkDisabled":false,"pId":1463},{"id":1467,"name":"沂南县","isParent":false,"checked":false,"chkDisabled":false,"pId":1463},{"id":1468,"name":"郯城县","isParent":false,"checked":false,"chkDisabled":false,"pId":1463},{"id":1469,"name":"沂水县","isParent":false,"checked":false,"chkDisabled":false,"pId":1463},{"id":1470,"name":"苍山县","isParent":false,"checked":false,"chkDisabled":false,"pId":1463},{"id":1471,"name":"费县","isParent":false,"checked":false,"chkDisabled":false,"pId":1463},{"id":1472,"name":"平邑县","isParent":false,"checked":false,"chkDisabled":false,"pId":1463},{"id":1473,"name":"莒南县","isParent":false,"checked":false,"chkDisabled":false,"pId":1463},{"id":1474,"name":"蒙阴县","isParent":false,"checked":false,"chkDisabled":false,"pId":1463},{"id":1475,"name":"临沭县","isParent":false,"checked":false,"chkDisabled":false,"pId":1463},{"id":1505,"name":"菏泽市","isParent":true,"checked":false,"chkDisabled":false,"pId":1357},{"id":1506,"name":"牡丹区","isParent":false,"checked":false,"chkDisabled":false,"pId":1505},{"id":1507,"name":"曹县","isParent":false,"checked":false,"chkDisabled":false,"pId":1505},{"id":1508,"name":"单县","isParent":false,"checked":false,"chkDisabled":false,"pId":1505},{"id":1509,"name":"成武县","isParent":false,"checked":false,"chkDisabled":false,"pId":1505},{"id":1510,"name":"巨野县","isParent":false,"checked":false,"chkDisabled":false,"pId":1505},{"id":1511,"name":"郓城县","isParent":false,"checked":false,"chkDisabled":false,"pId":1505},{"id":1512,"name":"鄄城县","isParent":false,"checked":false,"chkDisabled":false,"pId":1505},{"id":1513,"name":"定陶县","isParent":false,"checked":false,"chkDisabled":false,"pId":1505},{"id":1514,"name":"东明县","isParent":false,"checked":false,"chkDisabled":false,"pId":1505},{"id":810,"name":"江苏省","isParent":true,"checked":false,"chkDisabled":false,"pId":0},{"id":811,"name":"南京市","isParent":true,"checked":false,"chkDisabled":false,"pId":810},{"id":821,"name":"江宁区","isParent":false,"checked":false,"chkDisabled":false,"pId":811},{"id":853,"name":"苏州市","isParent":true,"checked":false,"chkDisabled":false,"pId":810},{"id":857,"name":"姑苏区","isParent":false,"checked":false,"chkDisabled":false,"pId":853},{"id":3323,"name":"高新区","isParent":false,"checked":false,"chkDisabled":false,"pId":853},{"id":926,"name":"浙江省","isParent":true,"checked":false,"chkDisabled":false,"pId":0},{"id":965,"name":"嘉兴市","isParent":true,"checked":false,"chkDisabled":false,"pId":926},{"id":966,"name":"南湖区","isParent":false,"checked":false,"chkDisabled":false,"pId":965},{"id":967,"name":"秀洲区","isParent":false,"checked":false,"chkDisabled":false,"pId":965},{"id":968,"name":"嘉善县","isParent":false,"checked":false,"chkDisabled":false,"pId":965},{"id":969,"name":"海盐县","isParent":false,"checked":false,"chkDisabled":false,"pId":965},{"id":970,"name":"海宁市","isParent":false,"checked":false,"chkDisabled":false,"pId":965},{"id":971,"name":"平湖市","isParent":false,"checked":false,"chkDisabled":false,"pId":965},{"id":972,"name":"桐乡市","isParent":false,"checked":false,"chkDisabled":false,"pId":965}];
  var checkSetting = 
    {
      check: {
        enable: true,
        chkboxType: { "Y": "ps", "N": "ps" } 
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      view: {
        nameIsHTML: true
      }
    };

    var radiocheckSetting = 
    {
      check: {
        enable: true,
        chkboxType: { "Y": "ps", "N": "ps" },
        chkStyle: "radio",
        radioType: "all" // "level"
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      view: {
        nameIsHTML: true
      }
    };

  var showSetting = 
   {
      check: {
        enable: false,
        chkboxType: { "Y": "ps", "N": "ps" }
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      view:{
        showIcon:false,
        nameIsHTML: true
      }
    };
  $.fn.zTree.init($("#ztree"), checkSetting, data);
  $.fn.zTree.init($("#ztree0"), radiocheckSetting, data);
  $.fn.zTree.init($("#ztree1"), showSetting, data);
})(jQuery);
