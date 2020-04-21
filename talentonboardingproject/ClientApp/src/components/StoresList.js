import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Table } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import AddStoreModal from './AddStoreModal'
import Footer from './Footer'
import EditStoreModal from './EditStoreModal'
import DeleteStoreModal from './DeleteStoreModal'
import IdComponent from './IdComponent'

class StoresList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { stores: [], id: 1 }
        this.refreshList = this.refreshList.bind(this)
        this.btnClick = this.btnClick.bind(this)
    }
    btnClick(e) {
        const id = e.target.value
        this.setState({ id })
        this.refreshList()
    }
    componentDidMount() {
        this.refreshList();
    }
    refreshList() {
        fetch("api/Stores")
            .then(response => response.json())
            .then(data => { this.setState({ stores: data }); }
            )
    }
    componentDidUpdate() {
        this.refreshList();
    }
    render() {
        const { stores } = this.state;

        return (
            <Container>
                <AddStoreModal />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Address</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {stores.map(store =>
                            <Table.Row key={store.id}>
                                <Table.Cell>{store.name}</Table.Cell>
                                <Table.Cell>{store.address}</Table.Cell>
                                <Table.Cell><EditStoreModal storeid={store.id} storename={store.name} storeaddress={store.address} /></Table.Cell>
                                <Table.Cell><DeleteStoreModal storeid={store.id} /></Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                <select value=""><options>1</options><options>2</options><options>3</options>...</select>
                <IdComponent name="1" onClick={this.btnClick} />
                <Footer />
            </Container>
        )
    }
}
export default StoresList
