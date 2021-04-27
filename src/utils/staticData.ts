//政治面貌
export const politicalStatusData:any[]=[
  {label:'中共党员',value:'中共党员'},
  {label:'群众',value:'群众'},
  {label:'共青团员',value:'共青团员'},
  {label:'其他',value:'其他'}
];
//企业性质
export const companyTypesData:any[]= [
    {label:'国有企业',value:1},
    {label:'三资企业',value:2},
    {label:'事业单位',value:3},
    {label:'其他企业',value:4},
];
//行业，地区，民族,企业性质，就业标志？

//
export const graduateChoiceList=[
  { label: '就业' ,value: '就业' },
  { label: '考研' ,value: '考研' },
  { label: '考公' ,value: '考公' },
  { label: '留学' ,value: '留学' },
  { label: '其他' ,value: '其他' },
  { label: '未就业' ,value: '未就业' },
]
export const companyRankMap=["50强","100强","500强","其他"];
export const companySizeMap=["0-20","20-99","100-499","500-999","1000-9999","10000及以上"];
const sizelist:any[]=[]
companySizeMap.map((item)=>{
  sizelist.push({label:item,value:item})
})
export const companySizeList=[...sizelist];

//行业
export const industryList=[
  {value:"edu",label:"教育行业"},
  {value:"animation",label:"动画行业"},
  {value:"game",label:"游戏行业"},
  {value:"newMedia",label:"新媒体行业"},
  {value:"internet",label:"互联网行业"},
  {value:"shop",label:"电商行业"},
  {value:"other",label:"其他"},
]
export const industryMap:any={
  "edu":"教育行业",
  "animation":"动画行业",
  "game":"游戏行业",
  "newMedia":"新媒体行业",
  "internet":"互联网行业",
  "shop":"电商行业",
  "other":"其他",
};

//专业
//本科专业
export const major0=[
  {label:"数字媒体技术",value:"dm"},
  {label:"计算机科学与技术",value:"cs"},
  {label:"电子信息工程",value:"em"},
  {label:"通信工程",value:"tx"},
  {label:"电子信息科学与技术",value:"ai"},
];
//研究生专业
export const major1=[
  {label:"计算机应用技术",value:"cat"},
  {label:"信号与信息处理",value:"sih"},
];
export const majorList:any[]=[...major0,...major1];
export const majorMap:any={
  "dm":"数字媒体技术",
  "cs":"计算机科学与技术",
  "em":"电子信息工程",
  "tx":"通信工程",
  "ai":"电子信息科学与技术",
  "cat":"计算机应用技术",
  "sih":"信号与信息处理"
};
//民族
export const nationalityList:any[]= ["壮族", "满族", "回族", "苗族", "维吾尔族", "土家族", "彝族", "蒙古族", "藏族", "布依族", "侗族", "瑶族", "朝鲜族", "白族", "哈尼族", "哈萨克族", "黎族", "傣族", "畲族", "傈僳族", "仡佬族", "东乡族", "高山族", "拉祜族", "水族", "佤族", "纳西族", "羌族", "土族", "仫佬族", "锡伯族", "柯尔克孜族", "达斡尔族", "景颇族", "毛南族", "撒拉族", "布朗族", "塔吉克族", "阿昌族", "普米族", "鄂温克族", "怒族", "京族", "基诺族", "德昂族", "保安族", "俄罗斯族", "裕固族", "乌兹别克族", "门巴族", "鄂伦春族", "独龙族", "塔塔尔族", "赫哲族", "珞巴族", "汉族"];
const list:any[]=[]
nationalityList.map((item)=>{
  list.push({label:item,value:item})
})
export const nationList=[...list];

export var mapData:any[]=[
  {
    name: "北京",
    value: 0
  },
  {
    name: "天津",
    value: 0
  },
  {
    name: "上海",
    value: 0
  },
  {
    name: "重庆",
    value: 0
  },
  {
    name: "河北省",
    value: 0
  },
  {
    name: "河南省",
    value: 0
  },
  {
    name: "云南省",
    value: 0
  },
  {
    name: "辽宁省",
    value: 0
  },
  {
    name: "黑龙江省",
    value: 0
  },
  {
    name: "湖南省",
    value: 0
  },
  {
    name: "安徽省",
    value: 0
  },
  {
    name: "山东省",
    value: 0
  },
  {
    name: "新疆维吾尔自治区",
    value: 0
  },
  {
    name: "江苏省",
    value: 0
  },
  {
    name: "浙江省",
    value: 0
  },
  {
    name: "江西省",
    value: 0
  },
  {
    name: "湖北省",
    value: 0
  },
  {
    name: "广西壮族自治区",
    value: 0
  },
  {
    name: "甘肃省",
    value: 0
  },
  {
    name: "山西省",
    value: 0
  },
  {
    name: "内蒙古自治区",
    value: 0
  },
  {
    name: "陕西省",
    value: 0
  },
  {
    name: "吉林省",
    value: 0
  },
  {
    name: "福建省",
    value: 0
  },
  {
    name: "贵州省",
    value: 0
  },
  {
    name: "广东省",
    value: 0
  },
  {
    name: "青海省",
    value: 0
  },
  {
    name: "西藏自治区",
    value: 0
  },
  {
    name: "四川省",
    value: 0
  },
  {
    name: "宁夏回族自治区",
    value: 0
  },
  {
    name: "海南省",
    value: 0
  },
  {
    name: "台湾",
    value: 0
  },
  {
    name: "香港特别行政区",
    value: 0
  },
  {
    name: "澳门特别行政区",
    value: 0
  },
  {
    name: "海外",
    value: 0
  }
]
 //省市
export const addressData:any[] = [
    {
      "value": "北京",
      "label": "北京",
      "children": [
        {
          "value": "北京市",
          "label": "北京市"
        }
      ]
    },
    {
      "value": "天津",
      "label": "天津",
      "children": [
        {
          "value": "天津市",
          "label": "天津市"
        }
      ]
    },
    {
      "value": "河北省",
      "label": "河北省",
      "children": [
        {
          "value": "石家庄市",
          "label": "石家庄市"
        },
        {
          "value": "唐山市",
          "label": "唐山市"
        },
        {
          "value": "秦皇岛市",
          "label": "秦皇岛市"
        },
        {
          "value": "邯郸市",
          "label": "邯郸市"
        },
        {
          "value": "邢台市",
          "label": "邢台市"
        },
        {
          "value": "保定市",
          "label": "保定市"
        },
        {
          "value": "张家口市",
          "label": "张家口市"
        },
        {
          "value": "承德市",
          "label": "承德市"
        },
        {
          "value": "沧州市",
          "label": "沧州市"
        },
        {
          "value": "廊坊市",
          "label": "廊坊市"
        },
        {
          "value": "衡水市",
          "label": "衡水市"
        }
      ]
    },
    {
      "value": "山西省",
      "label": "山西省",
      "children": [
        {
          "value": "太原市",
          "label": "太原市"
        },
        {
          "value": "大同市",
          "label": "大同市"
        },
        {
          "value": "阳泉市",
          "label": "阳泉市"
        },
        {
          "value": "长治市",
          "label": "长治市"
        },
        {
          "value": "晋城市",
          "label": "晋城市"
        },
        {
          "value": "朔州市",
          "label": "朔州市"
        },
        {
          "value": "晋中市",
          "label": "晋中市"
        },
        {
          "value": "运城市",
          "label": "运城市"
        },
        {
          "value": "忻州市",
          "label": "忻州市"
        },
        {
          "value": "临汾市",
          "label": "临汾市"
        },
        {
          "value": "吕梁市",
          "label": "吕梁市"
        }
      ]
    },
    {
      "value": "内蒙古自治区",
      "label": "内蒙古自治区",
      "children": [
        {
          "value": "呼和浩特市",
          "label": "呼和浩特市"
        },
        {
          "value": "包头市",
          "label": "包头市"
        },
        {
          "value": "乌海市",
          "label": "乌海市"
        },
        {
          "value": "赤峰市",
          "label": "赤峰市"
        },
        {
          "value": "通辽市",
          "label": "通辽市"
        },
        {
          "value": "鄂尔多斯市",
          "label": "鄂尔多斯市"
        },
        {
          "value": "呼伦贝尔市",
          "label": "呼伦贝尔市"
        },
        {
          "value": "巴彦淖尔市",
          "label": "巴彦淖尔市"
        },
        {
          "value": "乌兰察布市",
          "label": "乌兰察布市"
        },
        {
          "value": "兴安盟",
          "label": "兴安盟"
        },
        {
          "value": "锡林郭勒盟",
          "label": "锡林郭勒盟"
        },
        {
          "value": "阿拉善盟",
          "label": "阿拉善盟"
        }
      ]
    },
    {
      "value": "辽宁省",
      "label": "辽宁省",
      "children": [
        {
          "value": "沈阳市",
          "label": "沈阳市"
        },
        {
          "value": "大连市",
          "label": "大连市"
        },
        {
          "value": "鞍山市",
          "label": "鞍山市"
        },
        {
          "value": "抚顺市",
          "label": "抚顺市"
        },
        {
          "value": "本溪市",
          "label": "本溪市"
        },
        {
          "value": "丹东市",
          "label": "丹东市"
        },
        {
          "value": "锦州市",
          "label": "锦州市"
        },
        {
          "value": "营口市",
          "label": "营口市"
        },
        {
          "value": "阜新市",
          "label": "阜新市"
        },
        {
          "value": "辽阳市",
          "label": "辽阳市"
        },
        {
          "value": "盘锦市",
          "label": "盘锦市"
        },
        {
          "value": "铁岭市",
          "label": "铁岭市"
        },
        {
          "value": "朝阳市",
          "label": "朝阳市"
        },
        {
          "value": "葫芦岛市",
          "label": "葫芦岛市"
        }
      ]
    },
    {
      "value": "吉林省",
      "label": "吉林省",
      "children": [
        {
          "value": "长春市",
          "label": "长春市"
        },
        {
          "value": "吉林市",
          "label": "吉林市"
        },
        {
          "value": "四平市",
          "label": "四平市"
        },
        {
          "value": "辽源市",
          "label": "辽源市"
        },
        {
          "value": "通化市",
          "label": "通化市"
        },
        {
          "value": "白山市",
          "label": "白山市"
        },
        {
          "value": "松原市",
          "label": "松原市"
        },
        {
          "value": "白城市",
          "label": "白城市"
        },
        {
          "value": "延边朝鲜族自治州",
          "label": "延边朝鲜族自治州"
        }
      ]
    },
    {
      "value": "黑龙江省",
      "label": "黑龙江省",
      "children": [
        {
          "value": "哈尔滨市",
          "label": "哈尔滨市"
        },
        {
          "value": "齐齐哈尔市",
          "label": "齐齐哈尔市"
        },
        {
          "value": "鸡西市",
          "label": "鸡西市"
        },
        {
          "value": "鹤岗市",
          "label": "鹤岗市"
        },
        {
          "value": "双鸭山市",
          "label": "双鸭山市"
        },
        {
          "value": "大庆市",
          "label": "大庆市"
        },
        {
          "value": "伊春市",
          "label": "伊春市"
        },
        {
          "value": "佳木斯市",
          "label": "佳木斯市"
        },
        {
          "value": "七台河市",
          "label": "七台河市"
        },
        {
          "value": "牡丹江市",
          "label": "牡丹江市"
        },
        {
          "value": "黑河市",
          "label": "黑河市"
        },
        {
          "value": "绥化市",
          "label": "绥化市"
        },
        {
          "value": "大兴安岭地区",
          "label": "大兴安岭地区"
        }
      ]
    },
    {
      "value": "上海",
      "label": "上海",
      "children": [
        {
          "value": "上海市",
          "label": "上海市"
        }
      ]
    },
    {
      "value": "江苏省",
      "label": "江苏省",
      "children": [
        {
          "value": "南京市",
          "label": "南京市"
        },
        {
          "value": "无锡市",
          "label": "无锡市"
        },
        {
          "value": "徐州市",
          "label": "徐州市"
        },
        {
          "value": "常州市",
          "label": "常州市"
        },
        {
          "value": "苏州市",
          "label": "苏州市"
        },
        {
          "value": "南通市",
          "label": "南通市"
        },
        {
          "value": "连云港市",
          "label": "连云港市"
        },
        {
          "value": "淮安市",
          "label": "淮安市"
        },
        {
          "value": "盐城市",
          "label": "盐城市"
        },
        {
          "value": "扬州市",
          "label": "扬州市"
        },
        {
          "value": "镇江市",
          "label": "镇江市"
        },
        {
          "value": "泰州市",
          "label": "泰州市"
        },
        {
          "value": "宿迁市",
          "label": "宿迁市"
        }
      ]
    },
    {
      "value": "浙江省",
      "label": "浙江省",
      "children": [
        {
          "value": "杭州市",
          "label": "杭州市"
        },
        {
          "value": "宁波市",
          "label": "宁波市"
        },
        {
          "value": "温州市",
          "label": "温州市"
        },
        {
          "value": "嘉兴市",
          "label": "嘉兴市"
        },
        {
          "value": "湖州市",
          "label": "湖州市"
        },
        {
          "value": "绍兴市",
          "label": "绍兴市"
        },
        {
          "value": "金华市",
          "label": "金华市"
        },
        {
          "value": "衢州市",
          "label": "衢州市"
        },
        {
          "value": "舟山市",
          "label": "舟山市"
        },
        {
          "value": "台州市",
          "label": "台州市"
        },
        {
          "value": "丽水市",
          "label": "丽水市"
        }
      ]
    },
    {
      "value": "安徽省",
      "label": "安徽省",
      "children": [
        {
          "value": "合肥市",
          "label": "合肥市"
        },
        {
          "value": "芜湖市",
          "label": "芜湖市"
        },
        {
          "value": "蚌埠市",
          "label": "蚌埠市"
        },
        {
          "value": "淮南市",
          "label": "淮南市"
        },
        {
          "value": "马鞍山市",
          "label": "马鞍山市"
        },
        {
          "value": "淮北市",
          "label": "淮北市"
        },
        {
          "value": "铜陵市",
          "label": "铜陵市"
        },
        {
          "value": "安庆市",
          "label": "安庆市"
        },
        {
          "value": "黄山市",
          "label": "黄山市"
        },
        {
          "value": "滁州市",
          "label": "滁州市"
        },
        {
          "value": "阜阳市",
          "label": "阜阳市"
        },
        {
          "value": "宿州市",
          "label": "宿州市"
        },
        {
          "value": "六安市",
          "label": "六安市"
        },
        {
          "value": "亳州市",
          "label": "亳州市"
        },
        {
          "value": "池州市",
          "label": "池州市"
        },
        {
          "value": "宣城市",
          "label": "宣城市"
        }
      ]
    },
    {
      "value": "福建省",
      "label": "福建省",
      "children": [
        {
          "value": "福州市",
          "label": "福州市"
        },
        {
          "value": "厦门市",
          "label": "厦门市"
        },
        {
          "value": "莆田市",
          "label": "莆田市"
        },
        {
          "value": "三明市",
          "label": "三明市"
        },
        {
          "value": "泉州市",
          "label": "泉州市"
        },
        {
          "value": "漳州市",
          "label": "漳州市"
        },
        {
          "value": "南平市",
          "label": "南平市"
        },
        {
          "value": "龙岩市",
          "label": "龙岩市"
        },
        {
          "value": "宁德市",
          "label": "宁德市"
        }
      ]
    },
    {
      "value": "江西省",
      "label": "江西省",
      "children": [
        {
          "value": "南昌市",
          "label": "南昌市"
        },
        {
          "value": "景德镇市",
          "label": "景德镇市"
        },
        {
          "value": "萍乡市",
          "label": "萍乡市"
        },
        {
          "value": "九江市",
          "label": "九江市"
        },
        {
          "value": "新余市",
          "label": "新余市"
        },
        {
          "value": "鹰潭市",
          "label": "鹰潭市"
        },
        {
          "value": "赣州市",
          "label": "赣州市"
        },
        {
          "value": "吉安市",
          "label": "吉安市"
        },
        {
          "value": "宜春市",
          "label": "宜春市"
        },
        {
          "value": "抚州市",
          "label": "抚州市"
        },
        {
          "value": "上饶市",
          "label": "上饶市"
        }
      ]
    },
    {
      "value": "山东省",
      "label": "山东省",
      "children": [
        {
          "value": "济南市",
          "label": "济南市"
        },
        {
          "value": "青岛市",
          "label": "青岛市"
        },
        {
          "value": "淄博市",
          "label": "淄博市"
        },
        {
          "value": "枣庄市",
          "label": "枣庄市"
        },
        {
          "value": "东营市",
          "label": "东营市"
        },
        {
          "value": "烟台市",
          "label": "烟台市"
        },
        {
          "value": "潍坊市",
          "label": "潍坊市"
        },
        {
          "value": "济宁市",
          "label": "济宁市"
        },
        {
          "value": "泰安市",
          "label": "泰安市"
        },
        {
          "value": "威海市",
          "label": "威海市"
        },
        {
          "value": "日照市",
          "label": "日照市"
        },
        {
          "value": "莱芜市",
          "label": "莱芜市"
        },
        {
          "value": "临沂市",
          "label": "临沂市"
        },
        {
          "value": "德州市",
          "label": "德州市"
        },
        {
          "value": "聊城市",
          "label": "聊城市"
        },
        {
          "value": "滨州市",
          "label": "滨州市"
        },
        {
          "value": "菏泽市",
          "label": "菏泽市"
        }
      ]
    },
    {
      "value": "河南省",
      "label": "河南省",
      "children": [
        {
          "value": "郑州市",
          "label": "郑州市"
        },
        {
          "value": "开封市",
          "label": "开封市"
        },
        {
          "value": "洛阳市",
          "label": "洛阳市"
        },
        {
          "value": "平顶山市",
          "label": "平顶山市"
        },
        {
          "value": "安阳市",
          "label": "安阳市"
        },
        {
          "value": "鹤壁市",
          "label": "鹤壁市"
        },
        {
          "value": "新乡市",
          "label": "新乡市"
        },
        {
          "value": "焦作市",
          "label": "焦作市"
        },
        {
          "value": "濮阳市",
          "label": "濮阳市"
        },
        {
          "value": "许昌市",
          "label": "许昌市"
        },
        {
          "value": "漯河市",
          "label": "漯河市"
        },
        {
          "value": "三门峡市",
          "label": "三门峡市"
        },
        {
          "value": "南阳市",
          "label": "南阳市"
        },
        {
          "value": "商丘市",
          "label": "商丘市"
        },
        {
          "value": "信阳市",
          "label": "信阳市"
        },
        {
          "value": "周口市",
          "label": "周口市"
        },
        {
          "value": "驻马店市",
          "label": "驻马店市"
        }
      ]
    },
    {
      "value": "湖北省",
      "label": "湖北省",
      "children": [
        {
          "value": "武汉市",
          "label": "武汉市"
        },
        {
          "value": "黄石市",
          "label": "黄石市"
        },
        {
          "value": "十堰市",
          "label": "十堰市"
        },
        {
          "value": "宜昌市",
          "label": "宜昌市"
        },
        {
          "value": "襄阳市",
          "label": "襄阳市"
        },
        {
          "value": "鄂州市",
          "label": "鄂州市"
        },
        {
          "value": "荆门市",
          "label": "荆门市"
        },
        {
          "value": "孝感市",
          "label": "孝感市"
        },
        {
          "value": "荆州市",
          "label": "荆州市"
        },
        {
          "value": "黄冈市",
          "label": "黄冈市"
        },
        {
          "value": "咸宁市",
          "label": "咸宁市"
        },
        {
          "value": "随州市",
          "label": "随州市"
        },
        {
          "value": "恩施土家族苗族自治州",
          "label": "恩施土家族苗族自治州"
        }
      ]
    },
    {
      "value": "湖南省",
      "label": "湖南省",
      "children": [
        {
          "value": "长沙市",
          "label": "长沙市"
        },
        {
          "value": "株洲市",
          "label": "株洲市"
        },
        {
          "value": "湘潭市",
          "label": "湘潭市"
        },
        {
          "value": "衡阳市",
          "label": "衡阳市"
        },
        {
          "value": "邵阳市",
          "label": "邵阳市"
        },
        {
          "value": "岳阳市",
          "label": "岳阳市"
        },
        {
          "value": "常德市",
          "label": "常德市"
        },
        {
          "value": "张家界市",
          "label": "张家界市"
        },
        {
          "value": "益阳市",
          "label": "益阳市"
        },
        {
          "value": "郴州市",
          "label": "郴州市"
        },
        {
          "value": "永州市",
          "label": "永州市"
        },
        {
          "value": "怀化市",
          "label": "怀化市"
        },
        {
          "value": "娄底市",
          "label": "娄底市"
        },
        {
          "value": "湘西土家族苗族自治州",
          "label": "湘西土家族苗族自治州"
        }
      ]
    },
    {
      "value": "广东省",
      "label": "广东省",
      "children": [
        {
          "value": "广州市",
          "label": "广州市"
        },
        {
          "value": "韶关市",
          "label": "韶关市"
        },
        {
          "value": "深圳市",
          "label": "深圳市"
        },
        {
          "value": "珠海市",
          "label": "珠海市"
        },
        {
          "value": "汕头市",
          "label": "汕头市"
        },
        {
          "value": "佛山市",
          "label": "佛山市"
        },
        {
          "value": "江门市",
          "label": "江门市"
        },
        {
          "value": "湛江市",
          "label": "湛江市"
        },
        {
          "value": "茂名市",
          "label": "茂名市"
        },
        {
          "value": "肇庆市",
          "label": "肇庆市"
        },
        {
          "value": "惠州市",
          "label": "惠州市"
        },
        {
          "value": "梅州市",
          "label": "梅州市"
        },
        {
          "value": "汕尾市",
          "label": "汕尾市"
        },
        {
          "value": "河源市",
          "label": "河源市"
        },
        {
          "value": "阳江市",
          "label": "阳江市"
        },
        {
          "value": "清远市",
          "label": "清远市"
        },
        {
          "value": "东莞市",
          "label": "东莞市"
        },
        {
          "value": "中山市",
          "label": "中山市"
        },
        {
          "value": "潮州市",
          "label": "潮州市"
        },
        {
          "value": "揭阳市",
          "label": "揭阳市"
        },
        {
          "value": "云浮市",
          "label": "云浮市"
        }
      ]
    },
    {
      "value": "广西壮族自治区",
      "label": "广西壮族自治区",
      "children": [
        {
          "value": "南宁市",
          "label": "南宁市"
        },
        {
          "value": "柳州市",
          "label": "柳州市"
        },
        {
          "value": "桂林市",
          "label": "桂林市"
        },
        {
          "value": "梧州市",
          "label": "梧州市"
        },
        {
          "value": "北海市",
          "label": "北海市"
        },
        {
          "value": "防城港市",
          "label": "防城港市"
        },
        {
          "value": "钦州市",
          "label": "钦州市"
        },
        {
          "value": "贵港市",
          "label": "贵港市"
        },
        {
          "value": "玉林市",
          "label": "玉林市"
        },
        {
          "value": "百色市",
          "label": "百色市"
        },
        {
          "value": "贺州市",
          "label": "贺州市"
        },
        {
          "value": "河池市",
          "label": "河池市"
        },
        {
          "value": "来宾市",
          "label": "来宾市"
        },
        {
          "value": "崇左市",
          "label": "崇左市"
        }
      ]
    },
    {
      "value": "海南省",
      "label": "海南省",
      "children": [
        {
          "value": "海口市",
          "label": "海口市"
        },
        {
          "value": "三亚市",
          "label": "三亚市"
        },
        {
          "value": "三沙市",
          "label": "三沙市"
        },
        {
          "value": "儋州市",
          "label": "儋州市"
        }
      ]
    },
    {
      "value": "重庆",
      "label": "重庆",
      "children": [
        {
          "value": "重庆市",
          "label": "重庆市"
        }
      ]
    },
    {
      "value": "四川省",
      "label": "四川省",
      "children": [
        {
          "value": "成都市",
          "label": "成都市"
        },
        {
          "value": "自贡市",
          "label": "自贡市"
        },
        {
          "value": "攀枝花市",
          "label": "攀枝花市"
        },
        {
          "value": "泸州市",
          "label": "泸州市"
        },
        {
          "value": "德阳市",
          "label": "德阳市"
        },
        {
          "value": "绵阳市",
          "label": "绵阳市"
        },
        {
          "value": "广元市",
          "label": "广元市"
        },
        {
          "value": "遂宁市",
          "label": "遂宁市"
        },
        {
          "value": "内江市",
          "label": "内江市"
        },
        {
          "value": "乐山市",
          "label": "乐山市"
        },
        {
          "value": "南充市",
          "label": "南充市"
        },
        {
          "value": "眉山市",
          "label": "眉山市"
        },
        {
          "value": "宜宾市",
          "label": "宜宾市"
        },
        {
          "value": "广安市",
          "label": "广安市"
        },
        {
          "value": "达州市",
          "label": "达州市"
        },
        {
          "value": "雅安市",
          "label": "雅安市"
        },
        {
          "value": "巴中市",
          "label": "巴中市"
        },
        {
          "value": "资阳市",
          "label": "资阳市"
        },
        {
          "value": "阿坝藏族羌族自治州",
          "label": "阿坝藏族羌族自治州"
        },
        {
          "value": "甘孜藏族自治州",
          "label": "甘孜藏族自治州"
        },
        {
          "value": "凉山彝族自治州",
          "label": "凉山彝族自治州"
        }
      ]
    },
    {
      "value": "贵州省",
      "label": "贵州省",
      "children": [
        {
          "value": "贵阳市",
          "label": "贵阳市"
        },
        {
          "value": "六盘水市",
          "label": "六盘水市"
        },
        {
          "value": "遵义市",
          "label": "遵义市"
        },
        {
          "value": "安顺市",
          "label": "安顺市"
        },
        {
          "value": "毕节市",
          "label": "毕节市"
        },
        {
          "value": "铜仁市",
          "label": "铜仁市"
        },
        {
          "value": "黔西南布依族苗族自治州",
          "label": "黔西南布依族苗族自治州"
        },
        {
          "value": "黔东南苗族侗族自治州",
          "label": "黔东南苗族侗族自治州"
        },
        {
          "value": "黔南布依族苗族自治州",
          "label": "黔南布依族苗族自治州"
        }
      ]
    },
    {
      "value": "云南省",
      "label": "云南省",
      "children": [
        {
          "value": "昆明市",
          "label": "昆明市"
        },
        {
          "value": "曲靖市",
          "label": "曲靖市"
        },
        {
          "value": "玉溪市",
          "label": "玉溪市"
        },
        {
          "value": "保山市",
          "label": "保山市"
        },
        {
          "value": "昭通市",
          "label": "昭通市"
        },
        {
          "value": "丽江市",
          "label": "丽江市"
        },
        {
          "value": "普洱市",
          "label": "普洱市"
        },
        {
          "value": "临沧市",
          "label": "临沧市"
        },
        {
          "value": "楚雄彝族自治州",
          "label": "楚雄彝族自治州"
        },
        {
          "value": "红河哈尼族彝族自治州",
          "label": "红河哈尼族彝族自治州"
        },
        {
          "value": "文山壮族苗族自治州",
          "label": "文山壮族苗族自治州"
        },
        {
          "value": "西双版纳傣族自治州",
          "label": "西双版纳傣族自治州"
        },
        {
          "value": "大理白族自治州",
          "label": "大理白族自治州"
        },
        {
          "value": "德宏傣族景颇族自治州",
          "label": "德宏傣族景颇族自治州"
        },
        {
          "value": "怒江傈僳族自治州",
          "label": "怒江傈僳族自治州"
        },
        {
          "value": "迪庆藏族自治州",
          "label": "迪庆藏族自治州"
        }
      ]
    },
    {
      "value": "西藏自治区",
      "label": "西藏自治区",
      "children": [
        {
          "value": "拉萨市",
          "label": "拉萨市"
        },
        {
          "value": "日喀则市",
          "label": "日喀则市"
        },
        {
          "value": "昌都市",
          "label": "昌都市"
        },
        {
          "value": "林芝市",
          "label": "林芝市"
        },
        {
          "value": "山南市",
          "label": "山南市"
        },
        {
          "value": "那曲地区",
          "label": "那曲地区"
        },
        {
          "value": "阿里地区",
          "label": "阿里地区"
        }
      ]
    },
    {
      "value": "陕西省",
      "label": "陕西省",
      "children": [
        {
          "value": "西安市",
          "label": "西安市"
        },
        {
          "value": "铜川市",
          "label": "铜川市"
        },
        {
          "value": "宝鸡市",
          "label": "宝鸡市"
        },
        {
          "value": "咸阳市",
          "label": "咸阳市"
        },
        {
          "value": "渭南市",
          "label": "渭南市"
        },
        {
          "value": "延安市",
          "label": "延安市"
        },
        {
          "value": "汉中市",
          "label": "汉中市"
        },
        {
          "value": "榆林市",
          "label": "榆林市"
        },
        {
          "value": "安康市",
          "label": "安康市"
        },
        {
          "value": "商洛市",
          "label": "商洛市"
        }
      ]
    },
    {
      "value": "甘肃省",
      "label": "甘肃省",
      "children": [
        {
          "value": "兰州市",
          "label": "兰州市"
        },
        {
          "value": "嘉峪关市",
          "label": "嘉峪关市"
        },
        {
          "value": "金昌市",
          "label": "金昌市"
        },
        {
          "value": "白银市",
          "label": "白银市"
        },
        {
          "value": "天水市",
          "label": "天水市"
        },
        {
          "value": "武威市",
          "label": "武威市"
        },
        {
          "value": "张掖市",
          "label": "张掖市"
        },
        {
          "value": "平凉市",
          "label": "平凉市"
        },
        {
          "value": "酒泉市",
          "label": "酒泉市"
        },
        {
          "value": "庆阳市",
          "label": "庆阳市"
        },
        {
          "value": "定西市",
          "label": "定西市"
        },
        {
          "value": "陇南市",
          "label": "陇南市"
        },
        {
          "value": "临夏回族自治州",
          "label": "临夏回族自治州"
        },
        {
          "value": "甘南藏族自治州",
          "label": "甘南藏族自治州"
        }
      ]
    },
    {
      "value": "青海省",
      "label": "青海省",
      "children": [
        {
          "value": "西宁市",
          "label": "西宁市"
        },
        {
          "value": "海东市",
          "label": "海东市"
        },
        {
          "value": "海北藏族自治州",
          "label": "海北藏族自治州"
        },
        {
          "value": "黄南藏族自治州",
          "label": "黄南藏族自治州"
        },
        {
          "value": "海南藏族自治州",
          "label": "海南藏族自治州"
        },
        {
          "value": "果洛藏族自治州",
          "label": "果洛藏族自治州"
        },
        {
          "value": "玉树藏族自治州",
          "label": "玉树藏族自治州"
        },
        {
          "value": "海西蒙古族藏族自治州",
          "label": "海西蒙古族藏族自治州"
        }
      ]
    },
    {
      "value": "宁夏回族自治区",
      "label": "宁夏回族自治区",
      "children": [
        {
          "value": "银川市",
          "label": "银川市"
        },
        {
          "value": "石嘴山市",
          "label": "石嘴山市"
        },
        {
          "value": "吴忠市",
          "label": "吴忠市"
        },
        {
          "value": "固原市",
          "label": "固原市"
        },
        {
          "value": "中卫市",
          "label": "中卫市"
        }
      ]
    },
    {
      "value": "新疆维吾尔自治区",
      "label": "新疆维吾尔自治区",
      "children": [
        {
          "value": "乌鲁木齐市",
          "label": "乌鲁木齐市"
        },
        {
          "value": "克拉玛依市",
          "label": "克拉玛依市"
        },
        {
          "value": "吐鲁番市",
          "label": "吐鲁番市"
        },
        {
          "value": "哈密市",
          "label": "哈密市"
        },
        {
          "value": "昌吉回族自治州",
          "label": "昌吉回族自治州"
        },
        {
          "value": "博尔塔拉蒙古自治州",
          "label": "博尔塔拉蒙古自治州"
        },
        {
          "value": "巴音郭楞蒙古自治州",
          "label": "巴音郭楞蒙古自治州"
        },
        {
          "value": "阿克苏地区",
          "label": "阿克苏地区"
        },
        {
          "value": "克孜勒苏柯尔克孜自治州",
          "label": "克孜勒苏柯尔克孜自治州"
        },
        {
          "value": "喀什地区",
          "label": "喀什地区"
        },
        {
          "value": "和田地区",
          "label": "和田地区"
        },
        {
          "value": "伊犁哈萨克自治州",
          "label": "伊犁哈萨克自治州"
        },
        {
          "value": "塔城地区",
          "label": "塔城地区"
        },
        {
          "value": "阿勒泰地区",
          "label": "阿勒泰地区"
        }
      ]
    },
    {
      "value": "台湾",
      "label": "台湾",
      "children": []
    },
    {
      "value": "香港特别行政区",
      "label": "香港特别行政区",
      "children": []
    },
    {
      "value": "澳门特别行政区",
      "label": "澳门特别行政区",
      "children": []
    },
    {
      "value": "海外",
      "label": "海外",
      "children": []
    }
  ];

export const excelColumn:any[]= [
    { "dataIndex":"id","title":"学号"},
    { "dataIndex":"name","title":"姓名"},
    { "dataIndex":"gender","title":"性别"},
    { "dataIndex":"nationality","title":"民族"},
    { "dataIndex":"birthDate","title":"出生日期"},
    { "dataIndex":"faculty","title":"院系"},
    { "dataIndex":"educationStatus","title":"就读身份"},
    { "dataIndex":"yearOfEnrollment","title":"入学年份"},
    { "dataIndex":"yearOfGraduation","title":"毕业年份"},
    { "dataIndex":"politicalStatus","title":"政治面貌"},
    { "dataIndex":"homeTown","title":"籍贯"},
    { "dataIndex":"srcPlace","title":"生源地"},
    { "dataIndex":"dstPlace","title":"去向城市"},
    { "dataIndex":"major","title":"专业"},
    { "dataIndex":"majorClass","title":"班级"},
    { "dataIndex":"contactPhone","title":"联系手机"},
    { "dataIndex":"contactEmail","title":"联系邮箱"},
    { "dataIndex":"workArea","title":"工作行业"},
    { "dataIndex":"job","title":"工作岗位"},
    { "dataIndex":"companyRank","title":"公司排名"},
    { "dataIndex":"graduateChoice","title":"毕业去向"},
    { "dataIndex":"salary","title":"毕业薪资"},
    { "dataIndex":"companySize","title":"公司规模"},
    ]
