import { InputBase, List,ListItem, ListItemText, IconButton, Paper, makeStyles, ListItemSecondaryAction } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import { createAPIEndpoint, ENDPOINTS } from "../../api";
import SearchTwoToneIcon from '@material-ui/icons/SearchTwoTone';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(theme =>({
    searchPaper: {
        padding:'2px 4px',
        display: 'flex',
        alignItems: 'center',

    },
    searchInput: {
        marginLeft: theme.spacing(1,5),
        flex: 1,
    },
    listRoot: {
        marginTop: theme.spacing(1),
        maxHeight: 450,
        overflow: 'auto',
        '& li:hover': {
            cursor: 'pointer',
            backgroundColor: '#E3E3E3'
        },
        '& li:hover .MuiButtonBase-root': {
            display: 'black',
            color: '#000'
        },
        '& .MuiButtonBase-root': {
           //display: ''
        },
        '& .MuiButtonBase-root:hover': {
            backgroundColor: 'transparent'
        }, 
    }
}))

export default function SearchProductItems(props) {

    const { values, setValues  } = props;

    let orderedProductItems = values.orderDetails;
    const [productItems,setProductItems] = useState([])
    const [searchList, setSearchList] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const classes = useStyles();

    useEffect(() => {
        createAPIEndpoint(ENDPOINTS.PRODUCTITEM).fetchAll()
        .then(res => {
             setProductItems(res.data);
             setSearchList(res.data);
        })
        .catch(err => console.log(err))
        },[])
    
        useEffect(() => {
            let x = [...productItems];
            x = x.filter(y => {
                return y.productItemName.toLowerCase().includes(searchKey.toLocaleLowerCase())
                   && orderedProductItems.every(item => item.productItemId != y.productItemId)
            });
            setSearchList(x);
        }, [searchKey, orderedProductItems])

        const addProductItem = productItem =>{
            let x ={
                orderMasterId : values.orderMasterId,
                orderDetailId : 0,
                productItemId : productItem.productItemId,
                quantity: 1,
                productItemPrice : productItem.price,
                productItemName : productItem.productItemName
            }
            setValues({
                ...values,
                orderDetails : [...values.orderDetails, x]
            })
        }

    return (
        <>
        <Paper className={classes.searchPaper}>
            <InputBase
                className={classes.searchInput}
                value={searchKey}
                onChange={e => setSearchKey(e.target.value)}
                placeholder="Search product items"/>
                <IconButton>
                    <SearchTwoToneIcon />
                </IconButton>
        </Paper>
         <List className={classes.listRoot}>
             {
                searchList.map((item,idx)=>(
                     <ListItem
                     key={idx}
                     onClick={e =>addProductItem(item)}>
                         <ListItemText
                         primary ={item.productItemName}
                         secondary={'$'+item.price} />
                         <ListItemSecondaryAction>
                                <IconButton onClick={e =>addProductItem(item)}>
                                    <PlusOneIcon />
                                    <ArrowForwardIosIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                     </ListItem>
                 ))
             }
         </List>
         </>
    )
}
