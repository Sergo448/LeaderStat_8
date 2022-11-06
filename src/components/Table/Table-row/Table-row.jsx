import TableCell from "../Table-cell/Table-cell";

const TableRow = (props) => {

  const {
    id,
    kpgz,
    spgzItem,
    unit,
    okpd,
    okpd2
  } = props


  return (
    <div className="table__row">
      {props.map(cell => (
        <TableCell item={props[cell]}/>
      ))}
    </div>

    // <div className="table__row">
    //   <TableCell item={id} />
    //   <TableCell item={kpgz} />
    //   <TableCell item={spgzItem} />
    //   <TableCell item={unit} />
    //   <TableCell item={okpd} />
    //   <TableCell item={okpd2} />
    // </div>
  )
};

export default TableRow;