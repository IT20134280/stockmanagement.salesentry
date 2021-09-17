import React from 'react'
import OrderForm from './OrderForm'
import { useForm } from '../../hooks/useForm';
import { Grid } from "@material-ui/core";
import OrderedProductItems from "./OrderedProductItems";
//import SearchProductItem from "./SearchProductItem";
import SearchProductItem from "./SearchProductItems";
//import  SearchPItems  from "./SearchPItems";

const generateOrderNumber = () => Math.floor(100000 + Math.random() * 900000).toString();
const getFreshModelObject = () =>({
    orderMasterId :0,
    orderNumber : generateOrderNumber(),
    customerId: 0,
    pMethod: 'None',
    gTotal: 0,
    deleteedOrderItemIds:'',
    orderDetails:[]
})

export default function  Order() {

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetFormControls
    } = useForm(getFreshModelObject);

    
   
    

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <OrderForm
                  {...{values, 
                    setValues,
                    errors, 
                    setErrors,
                    handleInputChange}}
                />
            </Grid>
            <Grid item xs={6}>
                 <SearchProductItem
                    {...{ //addProductItem,
                        values, 
                        setValues}}
                 />
            </Grid>
            <Grid item xs={6}>
                <OrderedProductItems 
                    {...{ 
                           //orderedProductItems: values.orderDetails,
                           //removeProductItem,
                          values, 
                          setValues
                        }}
                />
            </Grid>
        </Grid>
    )
}
