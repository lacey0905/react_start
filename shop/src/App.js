/* eslint-disable */
import React, { useContext, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown, button } from 'react-bootstrap';
import './App.css';
import Data from './data.js';
import Detail from './Detail.js';
import axios from 'axios';

import { Link, Route, Switch } from 'react-router-dom';

import Cart from './cart.js';

export let invenContext = React.createContext();

function App() {

	let [shoes, setShoes] = useState(Data);
	let [inventory, setInventory] = useState([10, 11, 12]);


  	return (
    <div className="App">
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="#home">Shop</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="me-auto">
					<Nav.Link as={Link} to='/'>
						Home]
					</Nav.Link>
					<Nav.Link as={Link} to='/detail'>
						Detail
					</Nav.Link>
					<NavDropdown title="Dropdown" id="basic-nav-dropdown">
					<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
					<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
					<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
					</NavDropdown>
				</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>

		<Switch>
			<Route exact path='/'>
				<div>
					<h1>Title</h1>
					<p>Content</p>
					<button>Button</button>
				</div>
				<div className="container">

					<invenContext.Provider value={ inventory }>

					<div className="row">
						{
							shoes.map(function(a, i){
								return (
									<Item item={ a } key={ i } />
								)
							})
						}
					</div>

					</invenContext.Provider>

					<div className='btn btn-primary' onClick={
						function(){
							axios.get('https://codingapple1.github.io/shop/data2.json')
							.then(function(result){
								setShoes([...shoes, ...result.data]);
							})
							.catch(function(){
								console.log('실패');
							});
						}
					}>더보기</div>
				</div>
			</Route>

			<Route path='/cart'>
				<Cart />
			</Route>

			<Route path='/detail/:id'>
				<invenContext.Provider value={ inventory }>
					<Detail shoes={ shoes } inventory={ inventory } setInventory={setInventory} />
				</invenContext.Provider>
			</Route>

			<Route path='/:id'>
				<div>아무거나 적어</div>
			</Route>


		</Switch>

    </div>
  );
}

function Item(props) {

	let inven = useContext(invenContext);

	return (
		<div className="col-md-4">
			<img src={`https://codingapple1.github.io/shop/shoes${props.item.id+1}.jpg`} width="100%" />
			<h4>{ props.item.title }</h4>
			<p>{ props.item.content }</p>
			<p>{ props.item.price }</p>
			{/* {inven[props.item.id]} */}
			<Test />
		</div>
	);
}

function Test() {
	let inven = useContext(invenContext);
	return (
		<p>재고 : { inven }</p>
	)
}


export default App;
