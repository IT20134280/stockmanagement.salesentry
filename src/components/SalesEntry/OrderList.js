import { TableBody, TableCell, TableRow, TableHead } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import Table from "../../layouts/Table";
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

export default function OrderList(props) {

    const { setOrderId, setorderListvisiblilty  } = props;
    const [orderList, setOrderList] = useState([]);
    
    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.ORDER).fetchAll()
        .then(res => {
            setOrderList(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    //const showForUpdate = id => {
     //   setOrderId(id);
     //   setorderListvisiblilty(false)
   // }

    return (
         <Table>
             <TableHead>
                 <TableRow>
                     <TableCell>Order No.</TableCell>
                     <TableCell>Customer</TableCell>
                     <TableCell>Paied</TableCell>
                     <TableCell>Grand Total</TableCell>
                     <TableCell></TableCell>
                 </TableRow>
             </TableHead>
             <TableBody>
                 {
                     orderList.map(item => (
                         <TableRow key={item.orderMasterId}>
                             <TableCell>
                                {item.orderNumber} 
                             </TableCell>
                             <TableCell>
                                 {item.customer.customerName}
                             </TableCell>
                             <TableCell>
                                 {item.pMethod}
                             </TableCell>
                             <TableCell>
                                 {item.gTotal}
                             </TableCell>
                             <TableCell>
                                 <DeleteTwoToneIcon 
                                 color= "secondary"/>
                             </TableCell>
                             </TableRow>
                     ))
                 }
             </TableBody>
         </Table>
    )
}
