﻿import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'
import { Form, Input } from 'semantic-ui-react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
class AddStoreModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = { snackbarOpen: false, snackbarMsg: '' }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    state = { modalOpen: false }
    handleOpen = () => this.setState({ modalOpen: true })
    handleClose = () => this.setState({ modalOpen: false })
    snackbarClose = (e) => { this.setState({ snackbarOpen: false }) }
    handleSubmit = (event) => {
        event.preventDefault();
        this.handleClose();
        fetch('api/Stores', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: event.target.name.value,
                address: event.target.address.value
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
                <Modal trigger={<Button primary onClick={this.handleOpen}>New Store</Button>}
                    open={this.state.modalOpen}
                    onClose={this.handleClose}>
                    <Modal.Header>Create Store</Modal.Header>
                    <Modal.Content>
                        <Form method="POST" onSubmit={this.handleSubmit}>
                            <Form.Field>
                                <label>Name</label>
                                <Input name="name" placeholder='Store name' onChange={this.handleChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <Input name="address" placeholder='Address' onChange={this.handleChange} />
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
export default AddStoreModal

