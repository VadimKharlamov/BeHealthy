import Card from "antd/es/card/Card"
import { Cardtitle } from "./Cardtitle"
import Button from "antd/es/button/button";
import './components.css'
import { Flex } from "antd";

interface Props {
    medEvents: MedEvent[]
    handleDelete: (id: string) => void;
    handleOpen: (medEvent: MedEvent) => void;
    status: boolean
}

export const MedEvents = ({medEvents, handleDelete, handleOpen, status}: Props) => {
    return (
        <div className = "EventCards" style={{overflow: 'auto', maxHeight: '1000px'}}>
            {medEvents.map((medEvent : MedEvent) => (
                <Card 
                    loading = {status}
                    style={{margin: "0 400px 20px 0", width: 1200, backgroundColor:'#e6f1fb'}}
                    key={medEvent.id} 
                    title ={<Cardtitle title={medEvent.title} date={new Date(medEvent.visitTime).toLocaleString([], {day:'2-digit',month: '2-digit',year:'numeric', hour: '2-digit', minute:'2-digit'})}/>} 
                    bordered = {false}>
                    <div className='card_body'>
                    <p>{medEvent.description ? `Описание: ${medEvent.description}` : ""}</p>
                    <p>{medEvent.direction ? `Направление: ${medEvent.direction}` : ""}</p>
                    <p>{medEvent.doctorName ? `Лечащий врач: ${medEvent.doctorName}` : ""}</p>
                    <p>{medEvent.doctorPhone ? `Номер: ${medEvent.doctorPhone}` : ""}</p>
                    <p>{medEvent.clinicName ? `Клиника: ${medEvent.clinicName}` : ""}</p>
                    <p>{medEvent.clinicPhone ? `Номер клиники: ${medEvent.clinicPhone}` : ""}</p>
                    <p>{medEvent.visitTime ? `Время посещения: ${new Date(medEvent.visitTime).toLocaleString('ru-GB')}` : ""}</p>
                    <p>{medEvent.address ? `Адресс: ${medEvent.address}` : ""}</p>

                    </div>
                    <div className="card__buttons">
                        <Flex wrap="wrap" gap={50}>
                        <Button 
                        size='large'
                        onClick={() => handleOpen(medEvent)} 
                        style ={{flex: 1}}> Редактировать </Button>
                        <Button 
                        size='large'
                        onClick={() => handleDelete(medEvent.id)} 
                        danger 
                        style={{flex: 1}}> Удалить </Button>
                        </Flex>
                    </div>
                </Card>
            ))}
        </div>
    );
};