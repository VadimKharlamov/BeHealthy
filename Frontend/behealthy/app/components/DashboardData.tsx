import Space from "antd/es/space";
import { Badge } from "antd";
import dayjs from "dayjs";

interface CalendarNode {
    id: string
    type: string;
    title: string;
    date: Date;
    takeCount: string;
    takeType: string
}

interface Props {
    dataType: string;
    meds: Med[];
    medEvents: MedEvent[];
}

let type = new Map<number, string>([
    [1, 'таблетки'],
    [2, 'капель'],
    [3, 'миллиграмм'],
    [4, 'грамм'],
]);

let eat = new Map<number, string>([
    [1, 'до еды'],
    [2, 'после еды'],
    [3, 'во время еды'],
    [4, ''],
]);

export const DashboardItem = ({meds, medEvents, dataType}: Props) => {
    let data : CalendarNode[] = []
    let curDate: Date;
    if (dataType == "Tomorrow") {
        curDate = dayjs(new Date()).add(1,'day').toDate();
    } else {
        curDate = new Date();
    }
    meds.forEach(function (obj) {
        obj.takeTime.forEach(function (date) {
            if (new Date(date).getDate() == curDate.getDate()) {
                let node : CalendarNode = {id: obj.id, type: 'med', title: obj.title, date: date,
                 takeCount: `${obj.count} ${type.get(obj.countType)}`, takeType: `${eat.get(obj.takeType)}`}
                data.push(node)
            }
        })
    })
    medEvents.forEach(function (obj) {
        if (new Date(obj.visitTime).getDay() == curDate.getDay()) {
            let node : CalendarNode = {id: obj.id, type: 'event', title: obj.title, date: obj.visitTime, takeCount: "", takeType: ""}
            data.push(node)
        }
    })

    return (
        <div className = "dashboardBadges" style={{overflow: 'auto'}}>
            <Space direction='vertical' style={{margin: '10px 0 0 0'}}>
            {data.length == 0 ? <p> {dataType == 'Today' ? "На сегодня ничего не запланировано" : "На завтра ничего не запланировано"} </p> : ""}
            {data.map((node : CalendarNode) => (
                <Badge color={node.type == 'med' ? "green" : "cyan"} text = {node.type == 'med' ? 
                `Принять ${node.title} ${node.takeType}, доза: ${node.takeCount}` : 
                `Не забыть про ${node.title} в ${new Date(node.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
                key={node.id}>
                 </Badge>
            ))}
            </Space>
        </div>
    )
}