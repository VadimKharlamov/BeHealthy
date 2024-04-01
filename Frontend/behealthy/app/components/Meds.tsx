import Card from "antd/es/card/Card"
import { Cardtitle } from "./Cardtitle"
import Button from "antd/es/button/button";
import './components.css'
import { Flex } from "antd";
import dayjs from "dayjs";

interface Props {
    meds: Med[]
    handleDelete: (id: string) => void;
    handleOpen: (med: Med) => void;
    status: boolean
}

function calcDays(date1: Date, dates: Date[]): number {
    const oneDay = 24 * 60 * 60 * 1000;
    let takes = 0;
    dates.forEach(date => {
        if (new Date(date).getTime() - date1.getTime() > 0 ||
         (new Date(date).getTime() - date1.getTime() < 0 &&
          new Date(date).getTime() - date1.getTime() > -1 * oneDay)) {
            takes++;
        }
    })
    return takes;
}

function differenceInDays(date1: Date, date2: Date): number {
    const oneDay = 24 * 60 * 60 * 1000;
    const diffInTime = date2.getTime() - date1.getTime();
    return Math.abs(Math.round(diffInTime / oneDay));
}

function nearestTake(date: Date[]): string {
    const curDate = new Date();
    let nearest = "";
    let oneDay = 24 * 60 * 60 * 1000;
    for(let i=0; i<date.length; i++){
        if (Math.abs(dayjs(date[i]).add(1,'day').diff(dayjs(curDate), "day")) < 1) {
            return "Сегодня";
        }
        if (Math.abs(dayjs(date[i]).add(1,'day').diff(curDate, "day")) >= 1 && Math.abs(dayjs(date[i]).add(1,'day').diff(curDate, "day")) < 2) {
            return "Завтра";
        }
        if (dayjs(date[i]).diff(curDate, "day") >= 0) {
            nearest =  new Date(date[i]).toLocaleDateString('en-GB')
        }
    }
    return nearest
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

export const Meds = ({meds, handleDelete, handleOpen, status}: Props) => {
    return (
        <div className = "cards" style={{overflow: 'auto', maxHeight: '900px'}}>
            {meds.map((med : Med) => (
                <Card 
                    loading = {status}
                    style={{margin: "0 400px 20px 0px", width: 1200, backgroundColor:'#e6f1fb'}}
                    key={med.id} 
                    title ={<Cardtitle title={med.title} date=""/>}
                    bordered = {true}>
                    <div className='card_body'>
                    <p>Разовая доза: {med.count} {type.get(med.countType)}</p>
                    <p>{med.description ? `Описание: ${med.description}` : ""}</p>
                    <p>Особенности приема: {eat.get(med.takeType)}</p>
                    <p>Начало приема: {new Date(med.takeTime[0]).toLocaleDateString('en-GB')}</p>
                    <p>Конец приема: {new Date(med.takeTime[med.takeTime.length - 1]).toLocaleDateString('en-GB')}</p>
                    <p>Осталось приемов: {calcDays(new Date, med.takeTime) != 0 
                    ? calcDays(new Date, med.takeTime) :
                     'Прием завершен'} </p>
                     <p>{differenceInDays(new Date(), new Date(med.takeTime[med.takeTime.length - 1])) >= 0 ?
                      `Ближайшее время приема: ${nearestTake(med.takeTime)}` : ""}</p>
                    </div>
                    <div className="card__buttons">
                        <Flex wrap="wrap" gap={50}>
                        <Button 
                        size='large'
                        onClick={() => handleOpen(med)} 
                        style ={{flex: 1}}> Редактировать </Button>
                        <Button 
                        size='large'
                        onClick={() => handleDelete(med.id)} 
                        danger 
                        style={{flex: 1}}> Удалить </Button>
                        </Flex>
                    </div>
                </Card>
            ))}
        </div>
    );
};