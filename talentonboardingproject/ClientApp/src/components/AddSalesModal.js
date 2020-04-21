﻿import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'
import { Form, Input } from 'semantic-ui-react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
class AddSalesModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = { custs: [], prodts: [], stores: [], snackbarOpen: false, snackbarMsg: '' }
        this.handleSubmit = this.handleSubmit.bind(this)
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
    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })

    snackbarClose = (e) => { this.setState({ snackbarOpen: false }) }
    handleSubmit = (event) => {
        event.preventDefault();
        this.handleClose();
        fetch('api/Sales', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dateSold: event.target.dateSold.value,
                customerId: event.target.customerId.value,
                productId: event.target.productId.value,
                storeId: event.target.storeId.value
            })
        })
            .then(response => response.json())
            .then(response => { this.setState({ snackbarOpen: true, snackbarMsg: "Data saved successfully" }) },
                error => { this.setState({ snackbarOpen: true, snackbarMsg: "Failed to add" }) })
    }
    render() {
        return (
            <div>
                <Snackbar anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
                    open={this.state.snackbarOpen} autoHideDuration={4000} onClose={this.snackbarClose}
                    message={<span id="message-id">{this.state.snackbarMsg}</span>}
                    action={[<IconButton key="close" arial-label="Close" color="inherit"
                        onClick={this.snackbarClose}>X</IconButton>]} />
                <Modal trigger={<Button primary onClick={this.handleOpen}>New Sales</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}>
                    <Modal.Header>Create Sales</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Date sold</label>
                                <Input type="date" name="dateSold" placeholder='' />
                            </Form.Field>

                            <Form.Field name="customerId" label='Customers' control='select'>{this.state.custs.map(cust =>
                                <option key={cust.id} value={cust.id}>{cust.name}</option>)}
                            </Form.Field>

                            <Form.Field name="productId" label='Products' control='select'>{this.state.prodts.map(prod =>
                                <option key={prod.id} value={prod.id}>{prod.name}</option>)}
                            </Form.Field>

                            <Form.Field name="storeId" label='Stores' control='select'>{this.state.stores.map(store =>
                                <option key={store.id} value={store.id}>{store.name}</option>)}
                            </Form.Field>
                            <Modal.Actions>
                                <Button floated="right" type='submit' color='green' inverted>create
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
export default AddSalesModal