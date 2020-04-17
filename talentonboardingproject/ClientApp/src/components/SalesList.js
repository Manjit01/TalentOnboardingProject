import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Table } from 'semantic-ui-react'
import { Container } from 'semantic-ui-react'
import AddSalesModal from './AddSalesModal'
import Footer from './Footer'
import EditSalesModal from './EditSalesModal'
import DeleteSalesModal from './DeleteSalesModal'
import IdComponent from './IdComponent'

class SalesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { sales: [], id: 1 }
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
        fetch("api/Sales")
            .then(response => response.json())
            .then(data => { this.setState({ sales: data }); }
            )
    }
    componentDidUpdate() {
        this.refreshList();
    }
    render() {
        const { sales } = this.state;

        return (
            <Container>
                <AddSalesModal />
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Customer</Table.HeaderCell>
                            <Table.HeaderCell>Product</Table.HeaderCell>
                            <Table.HeaderCell>Store</Table.HeaderCell>
                            <Table.HeaderCell>Date Sold</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {sales.map(sale =>
                            <Table.Row key={sale.id}>
                                <Table.Cell>{sale.customerName}</Table.Cell>
                                <Table.Cell>{sale.productName}</Table.Cell>
                                <Table.Cell>{sale.storeName}</Table.Cell>
                                <Table.Cell>{sale.dateSold}</Table.Cell>
                                <Table.Cell><EditSalesModal saleid={sale.id} saledate={sale.dateSold} salecust={sale.customerName} saleprod={sale.productName} salestore={sale.storeName} /></Table.Cell>
                                <Table.Cell><DeleteSalesModal saleid={sale.id} /></Table.Cell>
                            </Table.Row>
                        )
                        }
                    </Table.Body>
                </Table>
                <IdComponent name="1" onClick={this.btnClick} />
                <Footer />
            </Container>
        )
    }
}
export default SalesList