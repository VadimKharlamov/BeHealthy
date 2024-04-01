import { Popconfirm, Table } from "antd";
import dayjs from "dayjs";

interface Props {
    medHistory: MedHistory[];
    handleDelete: (id: string) => void;
}

interface TableItem {
    key: string;
    itemId: string;
    title: string;
    description: string;
    takeType: string;
    firstDate: string;
    lastDate: string;
    firstValue: Date;
    secondValue: Date;
}

interface FilterOption {
    text: string;
    value: string;
}


export const MedHistoryTable = ({medHistory, handleDelete}: Props) => {

    const data: TableItem[] = []

    const filterData: FilterOption[] = []

    let type = new Map<number, string>([
        [1, 'таблетки'],
        [2, 'капель'],
        [3, 'миллиграмм'],
        [4, 'грамм'],
    ]);

    medHistory.forEach(function (obj) {
        let item: TableItem = {key: obj.id, itemId: obj.id, title: obj.title, description: obj.description, 
            takeType: `${obj.count} ${type.get(obj.countType)}`, 
            firstDate: new Date(obj.takeTime[0]).toLocaleString('ru-GB', {day:'2-digit',month: '2-digit',year:'numeric'}), 
            lastDate: new Date(obj.takeTime[obj.takeTime.length - 1]).toLocaleString('ru-GB', {day:'2-digit',month: '2-digit',year:'numeric'}),
            firstValue: new Date(obj.takeTime[0]), secondValue: new Date(obj.takeTime[obj.takeTime.length - 1])}
        data.push(item)
        let filterItem: FilterOption = {text: obj.title, value: obj.title}
        filterData.push(filterItem)
    })

    const onDelete = async (id: string) => {
        handleDelete(id)
    }

    const columns = [
        {
          title: 'Название',
          dataIndex: 'title',
          key: 'title',
          filters: filterData,
          filterMode: 'tree',
          filterSearch: true,
          onFilter: (value: string, record: { title: string; }) => record.title.startsWith(value),
          width: '20%',
        },
        {
          title: 'Описание',
          dataIndex: 'description',
          key: 'description',
          width: '15%',
        },
        {
          title: 'Дозировка',
          dataIndex: 'takeType',
          key: 'takeType',
          width: '15%',
        },
        {
          title: 'Начало приема',
          dataIndex: 'firstDate',
          key: 'firstDate',
          width: '20%',
          sorter: (a:any, b:any) => dayjs(a.firstValue).unix() - dayjs(b.firstValue).unix(),
        },
        {
            title: 'Конец приема',
            dataIndex: 'lastDate',
            key: 'lastDate',
            width: '20%',
            sorter: (a:any, b:any) => dayjs(a.secondValue).unix() - dayjs(b.secondValue).unix()
        },
        {
            title: 'Операции',
            dataIndex: 'operation',
            width: '10%',
            render: (_: any, record: TableItem) =>
              data.length >= 1 ? (
                <Popconfirm title="Удалить?" description="Данное действие необратимо" cancelText="Отмена" onConfirm={() => onDelete(record.itemId)}>
                  <a>Удалить</a>
                </Popconfirm>
              ) : null,
          },
        ];
        const paginationConfig = {
            pageSize: 5
          };


    return (
        <div>
         <Table
            title={() => <h1>История приема лекарств</h1>}
            bordered
            columns={columns}
            dataSource={data}
            pagination={paginationConfig}
            />
        </div>
    )
}