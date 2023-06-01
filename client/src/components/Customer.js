import React from 'react';
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
//계층적으로 customer class 구현하기
class Customer extends React.Component {
    render(){
        return (
            <TableRow>
                <TableCell>{this.props.id}</TableCell>
                <TableCell><img src={this.props.image} alt ="profile/"/> </TableCell> 
                {/* alt는 해당 이미지를 대신할 태그표시 */}
                <TableCell>{this.props.name}</TableCell>
                <TableCell>{this.props.birthday}</TableCell>
                <TableCell>{this.props.job}</TableCell>
            </TableRow>
        )
    }
}

class CustomerProfile extends React.Component {
    render(){
        return (
            <div>
                <img src = {this.props.image}></img>
                <h2>{this.props.name}({this.props.id})</h2>
            </div>
        )
    }
}

class CustomerInfo extends React.Component {
    render(){
        return (
            <div>

                <p>{this.props.birthday}</p>
                <p>{this.props.job}</p>

            </div>
        )
    }
}


export default Customer;