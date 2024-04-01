import Card from "antd/es/card/Card";
import { Cardtitle } from "./Cardtitle";
import Space from "antd/es/space";

interface CalendarNode {
    id: string
    type: string;
    title: string;
    date: Date;
    description: string;
    adress: string;
    takeCount: string;
    takeType: string
    
}

interface Props {
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
    [1, 'До еды'],
    [2, 'После еды'],
    [3, 'Во время еды'],
    [4, 'Нету'],
]);

export const CalendarItem = ({meds, medEvents}: Props) => {
    let data : CalendarNode[] = []
    const week = 7 * 24 * 60 * 60 * 1000;
    const curDate = new Date();
    meds.forEach(function (obj) {
        obj.takeTime.forEach(function (date) {
            if (new Date(date).getTime() - curDate.getTime() > 0 && new Date(date).getTime() - curDate.getTime() <= week) {
                let node : CalendarNode = {id: obj.id, type: 'med', title: obj.title, date: date, description: obj.description, adress: "",
                 takeCount: `${obj.count} ${type.get(obj.countType)}`, takeType: `${eat.get(obj.takeType)}`}
                data.push(node)
            }
        })
    })
    medEvents.forEach(function (obj) {
        if (new Date(obj.visitTime).getTime() - curDate.getTime() > 0 && new Date(obj.visitTime).getTime() - curDate.getTime() <= week) {
            let node : CalendarNode = {id: obj.id, type: 'event', title: obj.title, date: obj.visitTime, description: obj.description, adress: obj.address,
            takeCount: "", takeType: ""}
            data.push(node)
        }
    })

    return (
        <div className = "calendarItems" style={{overflow: 'auto', maxHeight: '500px'}}>
            <Space direction='vertical'>
            {data.length == 0 ? <h1 style={{padding: '25px 0 25px'}}> Нет событий ближайшие 7 дней </h1> : ""}
            {data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).reverse().map((node : CalendarNode) => (
                <Card
                    key = {node.id.concat(new Date(node.date).toDateString())}
                    bordered = {false}
                    style={{margin: "0 400px 20px 0", width: 800, backgroundColor: `${node.type == "event" ? "hsla(199, 91%, 85%)" : "hsl(102, 53%, 91%)"}`, border: 0 }}
                    title={<Cardtitle title={node.title} date={node.type == "event" ? 
                    new Date(node.date).toLocaleString([], {day:'2-digit',month: '2-digit',year:'numeric', hour: '2-digit', minute:'2-digit'}) 
                    : new Date(node.date).toLocaleString([], {day:'2-digit',month: '2-digit',year:'numeric'})}/>}>
                    <div className='card_body'>
                        <p> {node.description ? `Описание: ${node.description}` : ""} </p>
                        <p> {node.adress ? `Адрес: ${node.adress}` : ""}</p>
                        <p> {node.takeCount ? `Разовая доза: ${node.takeCount}` : ""}</p>
                        <p> {node.takeType ? `Особенности приема: ${node.takeType}` : ""}</p>

                    </div>
                 </Card>
            ))}
            </Space>
        </div>
    )
}