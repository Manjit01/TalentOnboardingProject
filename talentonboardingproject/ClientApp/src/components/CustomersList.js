import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Table } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import AddCustomerModal from './AddCustomerModal'
import Footer from './Footer'
import EditCustomerModal from './EditCustomerModal'
import DeleteCustomerModal from './DeleteCustomerModal'
import IdComponent from './IdComponent'
class CustomersList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            custs: [], id: 1, itemPerPage: 5,
            pageNumbers: [],
            currentPage: 1}
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
        const { id } = this.state
        fetch('api/Customers/')
            .then(response => response.json())
            .then(data => { this.setState({ custs: data }); }
            )
    }
    componentDidUpdate() {
        this.refreshList();
    }

    render() {
        const { custs } = this.state;
        return (
            <Container>
                <AddCustomerModal />
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
                        {custs.map(cust =>
                            <Table.Row key={cust.id}>
                                <Table.Cell>{cust.name}</Table.Cell>
                                <Table.Cell>{cust.address}</Table.Cell>
                                <Table.Cell><EditCustomerModal custid={cust.id} custname={cust.name} custaddress={cust.address} /></Table.Cell>
                                <Table.Cell><DeleteCustomerModal custid={cust.id} /></Table.Cell>
                           
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
export default CustomersList
