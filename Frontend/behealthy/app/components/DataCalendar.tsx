import { Badge, Calendar, ConfigProvider } from "antd";
import { Dayjs } from "dayjs";
import '../components/components.css'
import 'moment/locale/ru';
import locale from 'antd/es/date-picker/locale/ru_RU';
import dayjs from "dayjs";


interface CalendarNode {
    type: string;
    title: string
    date: Date
}

interface Props {
    meds: Med[];
    medEvents: MedEvent[];
    status: boolean;
}


export const DataCalendar = ({meds, medEvents, status}: Props) => {
      const dateCellRender = (date: Dayjs) => {
        let data : CalendarNode[] = []
        const dateStr = date.format('YYYY-MM-DD');
        meds.forEach(function (obj) {
            obj.takeTime.forEach(function (date) {
                let node : CalendarNode = {type: 'green', title: obj.title, date: date}
                data.push(node)
            })
        })
        medEvents.forEach(function (obj) {
            let node : CalendarNode = {type: 'cyan', title: obj.title.concat(` ${new Date(obj.visitTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`), date: obj.visitTime}
            data.push(node)
        })
        const matchingNodes = data.filter((d) => dayjs(d.date).format('YYYY-MM-DD') === dateStr);
        return (
            <div>
            {matchingNodes.map((node, index) => (
                <li key={index}>
                    <ConfigProvider theme={{components: {Badge: {fontSizeSM: 17, fontSize: 18}}}}>
                    <Badge key={index} color={node.type} text={node.title}/>
                    </ConfigProvider>
                </li>
            ))}
            </div>
        );
      };

    return (
    <div>
        <ConfigProvider theme={{components: {Calendar: {fullPanelBg: '#F8F8F8', fullBg: '#F8F8F8'}}}}>
        <Calendar cellRender={status ? dateCellRender : undefined} locale={locale} fullscreen={status} />
        </ConfigProvider>
    </div>
    );
}