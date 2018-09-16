import logo from '../../assets/avatar.jpg'
import home from '../../assets/home.jpg'
import school from '../../assets/school.jpg'
import atom from '../../assets/atom.jpg'
const SelfInfo={
    baseInfo:[{
        subject:"Name",
        src:logo,
        des:'曹航',
        summary:'一个阳光宅男',
        itemLists:[{
            key:'姓名',
            value:"曹航"
        },{
            key:'民族',
            value:"汉族"
        },{
            key:'出生年月',
            value:"95/5/6"
        },{
            key:'邮箱',
            value:"1023819715@qq.com"
        }]
    },{
        subject:"Home",
        src:home,
        des:'安徽',
        summary:'安徽六安'
    },{
        subject:"School",
        src:school,
        des:'NUAA',
        summary:'南京航空航天大学'
    },{
        subject:"Major",
        src:atom,
        des:'核工程',
        summary:'核工程与核技术'
    }],
    hobby:[],
    skill:[]
}
export default SelfInfo