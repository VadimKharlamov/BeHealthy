interface Props {
    title: string;
    date : string
}

export const Cardtitle = ({title, date}: Props) => {
    return (
        <div style ={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: "20px"
        }}>
            <p className="card_title">{title}</p>
            <p className="card_date">{date}</p>
        </div>
    )
}