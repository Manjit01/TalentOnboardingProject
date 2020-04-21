﻿import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'
import { Form, Input } from 'semantic-ui-react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

class EditSalesModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = { id: '', date: '', customerid: '', productid: '', storeid: '' }
        this.state = { custs: [], prodts: [], stores: [], snackbarOpen: false, snackbarMsg: '' }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.changeHandler = this.changeHandler.bind(this)
    }
    componentDidMount() {
        //customers
        fetch("api/Customers")
            .then(response => response.json())
            .then(data => { this.setState({ custs: data }); })
        //products
        fetch("api/Products")
            .then(response => response.json())
            .then(data => { this.setState({ prodts: data }); })
        //stores
        fetch("api/Stores")
            .then(response => response.json())
            .then(data => { this.setState({ stores: data }); })
    }

    state = { modalOpen: false }
    handleOpen = (e) => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })
    changeHandler = (e) => { this.setState({ [e.target.name]: e.target.value }) }
    snackbarClose = (e) => { this.setState({ snackbarOpen: false }) }
    handleSubmit = (e) => {
        e.preventDefault();
        this.handleClose();
        fetch('api/sales/' + this.props.saleid,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: e.target.id.value,
                    dateSold: e.target.dateSold.value,
                    customerId: e.target.customerId.value,
                    productId: e.target.productId.value,
                    storeId: e.target.storeId.value
                })
            }
        )
            .then(response => response.text())
            .then(response => { this.setState({ snackbarOpen: true, snackbarMsg: "Data edited successfully" }) },
                error => { this.setState({ snackbarOpen: true, snackbarMsg: "Failed to edit" }) })
    }

    render() {
        return (
            <div>
                <Snackbar anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                    open={this.state.snackbarOpen} autoHideDuration={4000} onClose={this.snackbarClose}
                    message={<span id="message-id">{this.state.snackbarMsg}</span>}
                    action={[<IconButton key="close" arial-label="Close" color="inherit"
                        onClick={this.snackbarClose}>X</IconButton>]} />
                <Modal trigger={<Button color='yellow' onClick={this.handleOpen}><Icon name='edit' />Edit</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}>
                    <Modal.Header>Edit Sales</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field hidden>
                                <label>Id</label>
                                <Input name="id" placeholder='SalesId' value={this.state.id} defaultValue={this.props.saleid} onChange={this.changeHandler} />
                            </Form.Field>
                            <Form.Field>
                                <label>Date sold</label>
                                <Input name="dateSold" placeholder='yyyy-mm-dd' value={this.state.date} defaultValue={this.props.saledate} onChange={this.changeHandler} />
                            </Form.Field>

                            <Form.Field 
                                name="customerId" label='Customers' control='select' onChange={this.changeHandler} defaultValue={this.props.salecust}>{this.state.custs.map(cust =>
                                    <option key={cust.id} value={cust.id}>{cust.name}</option>)}
                            </Form.Field>
                            <Form.Field name="productId" label='Products' control='select' onChange={this.changeHandler} defaultValue={this.props.saleprod}>{this.state.prodts.map(prod =>
                                <option key={prod.id} value={prod.id}>{prod.name}</option>)}
                            </Form.Field>

                            <Form.Field name="storeId" label='Stores' control='select' onChange={this.changeHandler} defaultValue={this.props.salestore}>{this.state.stores.map(store =>
                                <option key={store.id} value={store.id}>{store.name}</option>)}
                            </Form.Field>
                            <Modal.Actions>
                                <Button  floated='right' type='submit' color='green' inverted>edit
                            <label><Icon name='checkmark' /></label>
                                </Button>
                                <Button floated='right' secondary onClick={this.handleClose} inverted >
                                    cancel
                          </Button>
                            </Modal.Actions>
                        </Form>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}
export default EditSalesModal
