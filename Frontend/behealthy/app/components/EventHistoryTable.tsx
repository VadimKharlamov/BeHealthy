import { Popconfirm, Table } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

interface Props {
    eventHistory: EventHistory[];
    handleDelete: (id: string) => void;
}

interface TableItem {
    key: string;
    itemId: string;
    title: string;
    description: string;
    direction: string;
    doctorName: string;
    doctorPhone: string;
    clinicName: string;
    clinicPhone: string;
    visitTime: string;
    adress: string;
    timeValue: Date;
}

interface FilterOption {
    text: string;
    value: string;
}

export const EventHistoryTable = ({eventHistory, handleDelete}: Props) => {

    const data: TableItem[] = []

    const filterData: FilterOption[] = []

    eventHistory.forEach(function (obj) {
        let item: TableItem = {key: obj.id, itemId: obj.id, title: obj.title, description: obj.description, 
            direction: obj.direction, doctorName: obj.doctorName, doctorPhone: obj.doctorPhone, clinicName: obj.clinicName, clinicPhone: obj.clinicPhone,
        visitTime: new Date(obj.visitTime).toLocaleString('ru-GB', {day:'2-digit',month: '2-digit',year:'numeric'}), adress: obj.address, timeValue: obj.visitTime}
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
          width: '10%',
        },
        {
          title: 'Описание',
          dataIndex: 'description',
          key: 'description',
          width: '10%',
        },
        {
          title: 'Направление',
          dataIndex: 'direction',
          key: 'direction',
          width: '10%',
        },
        {
          title: 'Дата посещения',
          dataIndex: 'visitTime',
          key: 'visitTime',
          width: '10%',
          sorter: (a:any, b:any) => dayjs(a.timeValue).unix() - dayjs(b.timeValue).unix(),
        },
        {
            title: 'Адрес',
            dataIndex: 'adress',
            key: 'adress',
            width: '10%',
        },
        {
            title: 'Название клиники',
            dataIndex: 'clinicName',
            key: 'clinicName',
            width: '10%',
        },
        {
            title: 'Номер клиники',
            dataIndex: 'clinicPhone',
            key: 'clinicPhone',
            width: '10%',
        },
        {
            title: 'Лечащий врач',
            dataIndex: 'doctorName',
            key: 'doctorName',
            width: '10%',
        },
        {
            title: 'Номер врача',
            dataIndex: 'doctorPhone',
            key: 'doctorPhone',
            width: '10%',
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
            title={() => <h1>История событий</h1>}
            bordered
            columns={columns}
            dataSource={data}
            pagination={paginationConfig}
            />
        </div>
    )
}