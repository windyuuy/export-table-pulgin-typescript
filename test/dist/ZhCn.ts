


type uid=number;
type key=string;
type fk=number;
type bool=boolean;

var fields =[
	"语句索引",
	"译文",
]

export class ZhCnRow{
	
        /**
         * 语句索引
         **/
        语句索引:string = ""



        /**
         * 译文
         **/
        译文:string = ""



}

let ZhCn:ZhCnRow []=[];

var rowData=
[
	["先去召集所有的小伙伴吧","先去召集所有的小伙伴吧!\\n\\n你召集的小伙伴:"],
	["某某小伙伴收集进度","${名字}小伙伴: ${当前数量}/${总数}"],
]

let tableData: any[] = []
for (let record of rowData) {
    let obj = new ZhCnRow () as any
    for(let i = 0;i<fields.length;i++) {
        let key = fields[i]
        obj[key] = record[i]
    }
    tableData.push(obj)
}



for(let r of tableData){
    ZhCn .push(r);
	
}

export default ZhCn
