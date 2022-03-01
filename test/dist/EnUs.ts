


type uid=number;
type key=string;
type fk=number;
type bool=boolean;

var fields =[
	"语句索引",
	"译文",
]

export class EnUsRow{
	
        /**
         * 语句索引
         **/
        语句索引:string = ""



        /**
         * 译文
         **/
        译文:string = ""



}

let EnUs:EnUsRow []=[];

var rowData=
[
	["先去召集所有的小伙伴吧","summon your partaners!"],
	["某某小伙伴收集进度","${名字}parterners: ${当前数量}/${总数}"],
]

let tableData: any[] = []
for (let record of rowData) {
    let obj = new EnUsRow () as any
    for(let i = 0;i<fields.length;i++) {
        let key = fields[i]
        obj[key] = record[i]
    }
    tableData.push(obj)
}



for(let r of tableData){
    EnUs .push(r);
	
}

export default EnUs
