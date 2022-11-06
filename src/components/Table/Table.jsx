import React, { Children } from 'react';
import TableHeader from './Table-header/Table-header';
import TableRow from './Table-row/Table-row';
import './Table.css'

export default function Table(props) {



  return (
      <div className="table">
        <TableHeader
        tableRowClass={props.tableRowClass}
        tableHeaderClass={props.tableHeaderClass}
        tableCellClass={props.tableCellClass}
        headerArr={props.headerArr}
        />
        {props.children}
        {/* <TableRow
        props={[props]}
        /> */}

      </div>
      // : <div>loading...</div>
  )
};
