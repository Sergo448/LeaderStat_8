

const TableHeader = (props) => {
  return (
    <div className={`${props.tableRowClass} ${props.tableHeaderClass}`}>
      {props.headerArr.map(cell => (
        <div className={`${props.tableCellClass}`}>{cell}</div>
      ))}
    </div>
  )
};

export default TableHeader; 