


type uid=number;
type key=string;
type fk=number;
type bool=boolean;

var fields =[
	"id",
	"start1",
	"end1",
	"start2",
	"end2",
]

export class 所需时段Row{
	
        /**
         * id
         **/
        id:number = 0



        /**
         * 开始时段1
         **/
        start1:number = 0



        /**
         * 结束时段1
         **/
        end1:number = 0



        /**
         * 开始时段2
         **/
        start2:number = 0



        /**
         * 结束时段2
         **/
        end2:number = 0



}

let 所需时段:所需时段Row []=[];

var rowData=
[
	[1001,1,2,3,4],
	[1002,1,2,3,4],
]

let tableData: any[] = []
for (let record of rowData) {
    let obj = new 所需时段Row () as any
    for(let i = 0;i<fields.length;i++) {
        let key = fields[i]
        obj[key] = record[i]
    }
    tableData.push(obj)
}



for(let r of tableData){
    所需时段 .push(r);
	
}

export default 所需时段
