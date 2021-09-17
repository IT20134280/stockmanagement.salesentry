import { List, ListItemText, ListItem, Paper, ListItemSecondaryAction, IconButton, Button, ButtonGroup, makeStyles } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';
import { roundTo2DecimalPoint } from "../../utils/index";

const useStyles = makeStyles(theme =>({
    paperRoot: {
        margin: '15px 0px',
        '&:hover': {
            cursor: 'pointer'
        },
        '&:hover $deleteButton': {
            display: 'black'
        }
    },
    buttonGroup: {
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        '& .MuiButtonBase-root': {
            border: 'none',
            minWidth: '25px',
            padding: '1px'
        },
        '& button:nth-child(2)': {
            fontsize: '1.2em',
            color: '#000'
        }
    },
    deleteButton: {
        //display: 'none',
        '& .MuiButtonBase-root': {
            color: '#E81719'
        },
    },
    totalPerItem: {
        fontWeight: 'bolder',
        fontSize: '1.2em',
        margin: '0px, 10px'
    }
     
}))


export default function OrderedProductItems(props) {

    const {  values, setValues } = props;
    const classes = useStyles();

    let orderedProductItems = values.orderDetails;
    
    const removeProductItem = (index, id) => {
        let x = {...values };
        x.orderDetails = x.orderDetails.filter((_, i) => i != index);
        setValues({ ...x });
    }

    const updateQuantity = (idx, value) =>{
        let x = { ...values};
        let productItem = x.orderDetails[idx];
        if(productItem.quantity + value >0){
            productItem.quantity += value;
            setValues({ ...x });
        }
         
    }

    return (
        <>
         <List>
             {orderedProductItems.length == 0?
             <ListItem>
                 <ListItemText
                    primary="Please select product items"
                    primaryTypographyProps={{
                        style: {
                            textAlign: 'center',
                            fontStyle: 'italic'
                        }
                    }}
                />
             </ListItem>
            : orderedProductItems.map((item,idx)=>(
                     <Paper key={idx} className={classes.paperRoot}>
                         <ListItem>
                             <ListItemText
                             primary={item.productItemName}
                             primaryTypographyProps={{
                                 component: 'h1',
                                 style: {
                                     fontWeight: '500',
                                     fontSize: '1.2em'
                                 }
                             }}
                             secondary={
                                 <>
                                    <ButtonGroup
                                        className={classes.buttonGroup}
                                        size="small">
                                        <Button
                                            onClick = {e => updateQuantity(idx,-1)}
                                        >-</Button>
                                        <Button
                                            disabled
                                            >{item.quantity}</Button>
                                             <Button
                                                 onClick = {e => updateQuantity(idx,1)}
                                             >+</Button>
                                    </ButtonGroup>
                                    <span className={classes.totalPerItem}>
                                        {'$' + roundTo2DecimalPoint(item.quantity * item.productItemPrice)}
                                    </span>
                                    </>
                             }
                             secondaryTypographyProps={{
                                 component: 'div'
                             }}
                             />
                             <ListItemSecondaryAction
                             className={classes.deleteButton}>
                                 <IconButton
                                     disableRipple
                                     onClick={e => removeProductItem(idx, item.orderDetailsId)}
                                     >
                                    <DeleteTwoToneIcon />
                                 </IconButton>
                             </ListItemSecondaryAction>
                         </ListItem>
                     </Paper>
                 ))
             }
         </List>
         </>
    )
}
