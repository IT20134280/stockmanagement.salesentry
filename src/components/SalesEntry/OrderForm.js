import { ButtonGroup, Grid, InputAdornment,makeStyles, Button as MuiButton} from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import Form from "../../layouts/Form";
import { Input, Select, Button } from "../../controls";
import { Replay } from '@material-ui/icons';
import ReplayIcon from '@material-ui/icons/Replay';
import ReorderIcon from '@material-ui/icons/Reorder';
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import { roundTo2DecimalPoint } from "../../utils";
import Popup from '../../layouts/Popup';
//import {  } from "index";
import OrderList from "./OrderList";

const pMethod =[
    {id:'None', title: 'Select'},
    {id:'Cash', title: 'Cash'},
    {id:'Card', title: 'Card'},
]

const useStyles = makeStyles(theme =>({
    adornmentText: {
        '& .MuiTypography-root': {
            color: '#f3b33d',
            fontWeight: 'bolder',
            fontSize: '1.5em'
        }
    },
    submitButtonGroup: {
        backgroundColor: '#f3b33d',
        color: '#000',
        margin: theme.spacing(1),
        '& .MuiButton-label': {
            textTransform: 'none'
        },
        '&:hover': {
            backgroundColor: '#f3b33d',
        }
    }
}))

export default function OrderForm(props) {
    
    const {values, setValues, errors, setErrors, handleInputChange, resetFormControls } = props;
    const classes = useStyles();

    const [customerList,setCustomerList] = useState([]);
    const[orderListVisibility, setorderListvisiblilty] = useState(false);
    const [orderId, setOrderId] = useState(0);

    //const [x, setX] = useState();
    useEffect(()=>{
        createAPIEndpoint(ENDPOINTS.CUSTOMER).fetchAll()
        .then(res =>{
            let customerList = res.data.map(item => ({
                id: item.customerId,
                title: item.customerName
            }));
            customerList = [{ id: 0, title: 'Select' }].concat(customerList);
            setCustomerList(customerList);
        })
        .catch(err => console.log(err))
    },[])

    useEffect(() => {
        let gTotal = values.orderDetails.reduce((tempTotal, item) => {
            return tempTotal + (item.quantity * item.productItemPrice);
        }, 0);
        setValues({
            ...values,
            gTotal: roundTo2DecimalPoint(gTotal)
        })

    }, [JSON.stringify(values.orderDetails)] );

   // useEffect(() => {
    //    if (orderId == 0) resetFormControls()
    //    else{
    //        createAPIEndpoint(ENDPOINTS.ORDER).fetchById(orderId)
    //        .then(res => {
    //            console.log(res.data);
    //        })
    //        .catch(err => console.log(err))
    //    }
    //}, [orderId]);

    const validateForm = () =>{
        let temp = {};
        temp.customerId = values.customerId != 0 ? "" :"This field is required.";
        temp.pMethod = values.pMethod != "None" ? "" :"This field is required.";
        temp.orderDetails = values.orderDetails.length != 0 ? "" :"This field is required.";
        setErrors({...temp});
        return Object.values(temp).every(x => x==="");
    }

    const submitOrder = e=> {
        e.preventDefault();
        if(validateForm()){
           createAPIEndpoint(ENDPOINTS.ORDER).create(values)
           .then(res =>{
            resetFormControls();
           })
           .catch(err => console.log(err));
        }
    }

    const openListOfOrders = ()=>{
        setorderListvisiblilty(true);
    }

    return (
        <>
        <Form onSubmit={submitOrder}>
             <Grid>
                 <Grid container>
                     <Grid item xs={6}>
                        <Input
                            disabled
                            label="Order Number"
                            name="orderNumber"
                            value = {values.orderNumber}
                            InputProps={{
                                startAdornment : <InputAdornment
                                className={classes.adornmentText}
                                position = "start">#</InputAdornment>
                            }}
                        />
                        <Select
                            label="Payment Method"
                            name="pMethod"
                            value={values.pMethod}
                            onChange ={handleInputChange}
                            options={pMethod}
                            error={errors.pMethod}
                        />
                     </Grid>
                     <Grid item xs={6}>
                     <Select
                        label = "Customer"
                        name = "customerId"
                        value = {values.customerId}
                        onChange ={handleInputChange}
                        options={customerList}
                        error={errors.customerId}
                        /> 
                        <Input
                         disabled
                         label="Grand Total"
                         name="gTotal"
                         value = {values.gTotal}
                         InputProps={{
                            startAdornment : <InputAdornment
                            className={classes.adornmentText}
                            position = "start">$</InputAdornment>
                        }}
                         />

                        <ButtonGroup className={classes.submitButtonGroup}>
                          <MuiButton
                              size="large"
                              type="submit">Submit</MuiButton>
                            <MuiButton
                                size="small"
                                startIcon={<ReplayIcon />}
                            />
                         </ButtonGroup>
                         <Button
                         size="large"
                         onClick ={openListOfOrders}
                         startIcon={<ReorderIcon />}
                         >Sales Orders</Button>
                     </Grid>
                      
                </Grid>
             </Grid>
        </Form>
        <Popup
        title="List of Sales Orders"
        openPopup={orderListVisibility}
        setOpenPopup={setorderListvisiblilty}>
        <OrderList 
        {...{setOrderId, setorderListvisiblilty }}/>
        </Popup>
        </>
    )
}
